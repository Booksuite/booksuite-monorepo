import { CalendarDays } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/atoms/Button'
import { InputCalendar } from '@/components/atoms/InputCalendar'
import { InputSelect } from '@/components/atoms/InputSelect'

interface SearchAvailabilityProps {
    maxGuests?: number
    housingUnitId: string
}

export function SearchAvailability({
    maxGuests,
    housingUnitId,
}: SearchAvailabilityProps) {
    const router = useRouter()
    const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
    const [guests, setGuests] = useState<string>('1')

    const handleSearch = () => {
        if (!checkIn || !checkOut) return

        const searchParams = new URLSearchParams({
            checkIn: checkIn.toISOString(),
            checkOut: checkOut.toISOString(),
            guests: guests,
        })

        router.push(
            `/housing-unit/booking/${housingUnitId}?${searchParams.toString()}`,
        )
    }

    return (
        <div className="sticky top-10 lg:col-span-1 max-w-[35%] w-full">
            <div className="sticky top-4 bg-white rounded-xl shadow-lg p-6 border border-grey-100">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 mb-4">
                            <CalendarDays className="w-6 h-6 text-grey-primary" />
                            <h3 className="text-lg font-semibold">
                                Busque sua data
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-2 w-full">
                                <InputCalendar
                                    label="Data de entrada"
                                    className="w-full"
                                    value={checkIn}
                                    onChange={setCheckIn}
                                />
                                <InputCalendar
                                    label="Data de saida"
                                    className="w-full"
                                    value={checkOut}
                                    onChange={setCheckOut}
                                    minDate={
                                        checkIn ? new Date(checkIn) : undefined
                                    }
                                />
                            </div>
                            <div>
                                <InputSelect
                                    label="Hóspedes"
                                    value={guests}
                                    onChange={(value) => setGuests(value)}
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

                    <Button
                        className="w-full bg-primary-500 text-white hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSearch}
                        disabled={!checkIn || !checkOut}
                    >
                        <CalendarDays className="w-4 h-4 mr-2" />
                        Pesquisar disponibilidade
                    </Button>
                </div>
            </div>
        </div>
    )
}
