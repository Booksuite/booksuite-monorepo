import { useSearchRateOption } from '@booksuite/sdk'
import { CalendarX, Share2 } from 'lucide-react'
import { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { useCart } from '@/common/hooks/useCart'
import { Button } from '@/components/atoms/Button'
import { InputCalendar } from '@/components/atoms/InputCalendar'
import { InputSelect } from '@/components/atoms/InputSelect'
import {
    MealPlan,
    MealPlanSelector,
} from '@/components/molecules/MealPlanSelector'
import { PriceDisplay } from '@/components/molecules/PriceDisplay'

import { AddedToCartModal } from './AddedToCartModal'
import { ReservationInfoModal } from './ReservationInfoModal'

interface HousingUnitBookingFormProps {
    title: string
    housingUnitTypeId: string
    basePrice?: number
    weekendPrice?: number
    maxGuests?: number
    prices: Record<
        string,
        { value: number; available: number; isUnavailable?: boolean }
    >
    weekendDays: number[]
    image?: string
}

export const HousingUnitBookingForm: React.FC<HousingUnitBookingFormProps> = ({
    title,
    housingUnitTypeId,
    basePrice = 0,
    weekendPrice = basePrice,
    maxGuests,
    prices,
    weekendDays,
    image,
}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { company } = useCurrentCompanyStore()
    const { addToCart } = useCart()
    const [selectedMealPlans, setSelectedMealPlans] = useState<MealPlan[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

    const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
    const [guests, setGuests] = useState<string>('1')

    const checkAvailability = useCallback(
        (startDate: Date, endDate: Date) => {
            const dates: Date[] = []
            const currentDate = new Date(startDate)

            while (currentDate <= endDate) {
                dates.push(new Date(currentDate))
                currentDate.setDate(currentDate.getDate() + 1)
            }

            return dates.every((date) => {
                const dateKey = date
                    .toISOString()
                    .split('T')[0] as keyof typeof prices
                const price = prices[dateKey]
                return price && !price.isUnavailable && price.available > 0
            })
        },
        [prices],
    )

    useEffect(() => {
        const checkInParam = searchParams.get('checkIn')
        const checkOutParam = searchParams.get('checkOut')
        const guestsParam = searchParams.get('guests')

        if (checkInParam && checkOutParam) {
            const startDate = new Date(checkInParam)
            const endDate = new Date(checkOutParam)

            if (!checkAvailability(startDate, endDate)) {
                setError('Esgotado! Busque outra data.')
            } else {
                setCheckIn(startDate)
                setCheckOut(endDate)
            }
        }

        if (guestsParam) {
            setGuests(guestsParam)
        }
    }, [searchParams, checkAvailability])

    useEffect(() => {
        if (checkIn && checkOut) {
            const isAvailable = checkAvailability(checkIn, checkOut)
            if (!isAvailable) {
                setError('Esgotado! Busque outra data.')
            } else {
                setError(null)
            }
        }
    }, [checkIn, checkOut, checkAvailability])

    const calculateTotalDays = useCallback(() => {
        if (!checkIn || !checkOut) return { weekdays: 0, weekendDays: 0 }

        const days: Date[] = []
        const currentDate = new Date(checkIn)

        while (currentDate <= checkOut) {
            days.push(new Date(currentDate))
            currentDate.setDate(currentDate.getDate() + 1)
        }

        return days.reduce(
            (acc, date) => {
                const dayOfWeek = date.getDay()
                if (weekendDays.includes(dayOfWeek)) {
                    return { ...acc, weekendDays: acc.weekendDays + 1 }
                }
                return { ...acc, weekdays: acc.weekdays + 1 }
            },
            { weekdays: 0, weekendDays: 0 },
        )
    }, [checkIn, checkOut, weekendDays])

    const { weekdays, weekendDays: totalWeekendDays } = calculateTotalDays()

    const { data: reservationOptions } = useSearchRateOption(
        { companyId: company?.id ?? '' },
        {
            filter: {
                published: true,
            },
            pagination: {
                page: 1,
                itemsPerPage: 10,
            },
        },
        undefined,
        {
            query: {
                enabled: !!company?.id,
            },
        },
    )

    const mealPlans: MealPlan[] =
        reservationOptions?.items
            .filter((option) =>
                option.availableHousingUnitTypes.some(
                    (type) => type.housingUnitTypeId === housingUnitTypeId,
                ),
            )
            .map((option) => ({
                id: option.id,
                title: option.name,
                description: option.includedItems.join(', '),
                pricePerDay: option.additionalAdultPrice,
            })) ?? []

    const totalPrice =
        basePrice * weekdays +
        weekendPrice * totalWeekendDays +
        selectedMealPlans.reduce(
            (acc, plan) =>
                acc + plan.pricePerDay * (weekdays + totalWeekendDays),
            0,
        )

    const handleAddToCart = () => {
        if (!checkIn || !checkOut) {
            setError('Selecione as datas da sua estadia')
            return
        }

        addToCart({
            id: housingUnitTypeId,
            name: title,
            price: totalPrice,
            image: image ?? '',
            checkIn,
            checkOut,
            guests: parseInt(guests, 10),
            mealPlan:
                selectedMealPlans.length > 0
                    ? selectedMealPlans.map((plan) => plan.title).join(' + ')
                    : undefined,
        })

        setIsModalOpen(true)
    }

    const handleAddMore = () => {
        setIsModalOpen(false)
        setCheckIn(undefined)
        setCheckOut(undefined)
        setGuests('1')
        setSelectedMealPlans([])
    }

    const handleAdvance = () => {
        router.push('/cart' as Route)
    }

    const getDailyPrices = useCallback(() => {
        if (!checkIn || !checkOut) return []

        const prices: Array<{ date: Date; price: number }> = []
        const currentDate = new Date(checkIn)

        while (currentDate <= checkOut) {
            const isWeekend = weekendDays.includes(currentDate.getDay())
            const baseValue = isWeekend ? weekendPrice : basePrice
            const mealPlansValue = selectedMealPlans.reduce(
                (acc, plan) => acc + plan.pricePerDay,
                0,
            )

            prices.push({
                date: new Date(currentDate),
                price: baseValue + mealPlansValue,
            })

            currentDate.setDate(currentDate.getDate() + 1)
        }

        return prices
    }, [
        checkIn,
        checkOut,
        weekendDays,
        weekendPrice,
        basePrice,
        selectedMealPlans,
    ])

    return (
        <div className="w-full max-w-xl px-4">
            <div className="w-full flex items-center flex-row justify-between text-grey-primary">
                <h1 className="text-2xl font-medium">{title}</h1>
                <Share2 className="w-6 h-6 cursor-pointer" />
            </div>

            <div className="w-full mt-10">
                <div className="flex flex-col gap-8">
                    <div className="flex-1">
                        <h2 className="text-lg font-regular text-grey-secondary mb-2">
                            Detalhes da reserva
                        </h2>
                        <div className="flex flex-row ">
                            <div className="flex-1">
                                <InputCalendar
                                    label="Data da entrada"
                                    value={checkIn}
                                    onChange={(date) => {
                                        setCheckIn(date)
                                        setError(null)
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <InputCalendar
                                    label="Data da saída"
                                    value={checkOut}
                                    onChange={(date) => {
                                        setCheckOut(date)
                                        setError(null)
                                    }}
                                    minDate={
                                        checkIn ? new Date(checkIn) : undefined
                                    }
                                />
                            </div>
                            <div className="flex-1 ml-2">
                                <InputSelect
                                    label="Hóspedes"
                                    value={guests}
                                    onChange={setGuests}
                                    options={Array.from({
                                        length: maxGuests || 4,
                                    }).map((_, i) => ({
                                        value: String(i + 1),
                                        label: `${i + 1} ${
                                            i === 0 ? 'hóspede' : 'hóspedes'
                                        }`,
                                    }))}
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center justify-center h-10 rounded-md gap-2 bg-systemColors-red/10 text-systemColors-red w-full text-sm">
                            <div>
                                <CalendarX className="w-5 h-5" />
                            </div>
                            {error}
                        </div>
                    )}

                    {mealPlans.length > 0 && (
                        <div className="flex-1">
                            <h2 className="text-lg font-regular text-grey-secondary mb-2">
                                Opções disponíveis
                            </h2>
                            <div className="flex flex-row gap-2">
                                <div className="flex-1">
                                    <MealPlanSelector
                                        plans={mealPlans}
                                        multiSelect={true}
                                        onChange={setSelectedMealPlans}
                                        value={selectedMealPlans}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        <PriceDisplay
                            totalPrice={totalPrice}
                            onHelpClick={() => setIsInfoModalOpen(true)}
                        />
                        <Button
                            className="w-full bg-primary-500 text-white hover:bg-primary-600 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleAddToCart}
                            disabled={!checkIn || !checkOut || !!error}
                        >
                            Adicionar ao carrinho
                        </Button>
                    </div>
                </div>
            </div>

            <AddedToCartModal
                isOpen={isModalOpen}
                onAddMore={handleAddMore}
                onAdvance={handleAdvance}
            />

            <ReservationInfoModal
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
                title={title}
                checkIn={checkIn}
                checkOut={checkOut}
                totalDays={weekdays + totalWeekendDays}
                adults={Number(guests)}
                childrenCount={0}
                mealPlans={selectedMealPlans.map((plan) => plan.title)}
                dailyPrices={getDailyPrices()}
                totalPrice={totalPrice}
            />
        </div>
    )
}
