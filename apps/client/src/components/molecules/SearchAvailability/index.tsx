import { CalendarDays, Share2 } from 'lucide-react'

import { Button } from '@/components/atoms/Button'
import { InputCalendar } from '@/components/atoms/InputCalendar'
import { InputSelect } from '@/components/atoms/InputSelect'

interface SearchAvailabilityProps {
    name: string
    description: string
    maxGuests?: number
    onSearch?: () => void
}

export function SearchAvailability({
    name,
    description,
    maxGuests,
    onSearch,
}: SearchAvailabilityProps) {
    return (
        <div className="flex items-start gap-2">
            <div className="flex flex-col gap-2 w-full max-w-[70%]">
                <div className="flex items-center gap-3 justify-between">
                    <h1 className="text-2xl font-bold mb-2">{name}</h1>
                    <div
                        className="flex items-center mr-4 cursor-pointer border border-2 border-grey-600 rounded-full p-2"
                        onClick={onSearch}
                    >
                        <Share2 className="w-6 h-6 text-grey-600" />
                    </div>
                </div>
                <p className="text-grey-600 max-w-[90%]">{description}</p>
            </div>

            <div className="lg:col-span-1 max-w-[35%] w-full">
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
                                    />
                                    <InputCalendar
                                        label="Data de saida"
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <InputSelect
                                        label="Hóspedes"
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

                        <Button className="w-full bg-primary-500 text-white hover:bg-primary-600 transition-colors">
                            <CalendarDays className="w-4 h-4 mr-2" />
                            Pesquisar disponibilidade
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
