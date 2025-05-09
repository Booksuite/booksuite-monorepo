import { useState } from 'react'
import { CircleHelp } from 'lucide-react'
const travelReasons = [
    'Férias e lazer',
    'Aniversário',
    'Descanso',
    'Lua de mel',
    'Aniversário de casamento',
    'Passeio ou turismo de aventura',
    'Pedido de namoro ou noivado',
    'Outros',
]

export const TravelReasons = () => {
    const [selectedReasons, setSelectedReasons] = useState<string[]>([])

    return (
        <div className="flex flex-col gap-4 w-full items-center">
            <h2 className="text-xl font-semibold text-grey-primary text-center mb-4">
                Qual o motivo da sua viagem?
            </h2>
            <div className="p-8  border border-grey-200 rounded-lg flex flex-col  gap-8 w-2/3">
                <p className="text-center text-lg text-grey-primary mb-6">
                    Selecione uma ou mais opções abaixo:
                </p>

                <div className="space-y-4">
                    {travelReasons.map((reason) => (
                        <div
                            key={reason}
                            className="flex items-center justify-between"
                        >
                            <span className="text-grey-primary">{reason}</span>
                            <input
                                type="checkbox"
                                className="h-7 w-7 cursor-pointer"
                                checked={selectedReasons.includes(reason)}
                                onChange={() => {
                                    setSelectedReasons((prev) =>
                                        prev.includes(reason)
                                            ? prev.filter((r) => r !== reason)
                                            : [...prev, reason],
                                    )
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        onClick={() => {}}
                        className="text-grey-primary underline"
                    >
                        Pular
                    </button>
                    <button className="bg-primary-500 text-white px-8 py-2 rounded-md hover:bg-primary-600 transition-colors">
                        Avançar
                    </button>
                </div>
            </div>

            <div className="flex items-start gap-2 text-md text-grey-primary">
                <CircleHelp className="w-5 h-5" />
                <p>
                    O preenchimento é opcional e serve para sugerirmos
                    experiências personalizadas para sua viagem.
                </p>
            </div>
        </div>
    )
}
