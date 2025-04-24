import { useSearchReservationOption } from '@booksuite/sdk'
import { CalendarX, Share2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Button } from '@/components/atoms/Button'
import { InputCalendar } from '@/components/atoms/InputCalendar'
import { InputSelect } from '@/components/atoms/InputSelect'
import {
    MealPlan,
    MealPlanSelector,
} from '@/components/molecules/MealPlanSelector'
import { PriceDisplay } from '@/components/molecules/PriceDisplay'

interface HousingUnitBookingFormProps {
    title: string
    housingUnitTypeId: string
    basePrice?: number
    maxGuests?: number
    prices: Record<
        string,
        { value: number; available: number; isUnavailable?: boolean }
    >
}

export const HousingUnitBookingForm: React.FC<HousingUnitBookingFormProps> = ({
    title,
    housingUnitTypeId,
    basePrice = 0,
    maxGuests,
    prices,
}) => {
    const searchParams = useSearchParams()
    const { company } = useCurrentCompanyStore()
    const [selectedMealPlans, setSelectedMealPlans] = useState<MealPlan[]>([])
    const [error, setError] = useState<string | null>(null)

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

    const totalDays =
        checkIn && checkOut
            ? Math.ceil(
                  (checkOut.getTime() - checkIn.getTime()) /
                      (1000 * 60 * 60 * 24),
              )
            : 1

    const { data: reservationOptions } = useSearchReservationOption(
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
        basePrice * totalDays +
        selectedMealPlans.reduce(
            (acc, plan) => acc + plan.pricePerDay * totalDays,
            0,
        )

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
                            onHelpClick={() => {}}
                        />
                        <Button
                            className="w-full bg-primary-500 text-white hover:bg-primary-600 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => {}}
                            disabled={!checkIn || !checkOut || !!error}
                        >
                            Adicionar ao carrinho
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
