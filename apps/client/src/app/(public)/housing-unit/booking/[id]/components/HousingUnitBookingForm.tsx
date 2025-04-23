import { useSearchReservationOption } from '@booksuite/sdk'
import { Share2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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
}

export const HousingUnitBookingForm: React.FC<HousingUnitBookingFormProps> = ({
    title,
    housingUnitTypeId,
    basePrice = 0,
    maxGuests,
}) => {
    const searchParams = useSearchParams()
    const { company } = useCurrentCompanyStore()
    const [selectedMealPlans, setSelectedMealPlans] = useState<MealPlan[]>([])

    const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
    const [guests, setGuests] = useState<string>('1')

    useEffect(() => {
        const checkInParam = searchParams.get('checkIn')
        const checkOutParam = searchParams.get('checkOut')
        const guestsParam = searchParams.get('guests')

        if (checkInParam) {
            setCheckIn(new Date(checkInParam))
        }
        if (checkOutParam) {
            setCheckOut(new Date(checkOutParam))
        }
        if (guestsParam) {
            setGuests(guestsParam)
        }
    }, [searchParams])

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
                                    onChange={setCheckIn}
                                />
                            </div>
                            <div className="flex-1">
                                <InputCalendar
                                    label="Data da saída"
                                    value={checkOut}
                                    onChange={setCheckOut}
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
                            className="w-full bg-primary-500 text-white hover:bg-primary-600 h-12"
                            onClick={() => {}}
                        >
                            Adicionar ao carrinho
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
