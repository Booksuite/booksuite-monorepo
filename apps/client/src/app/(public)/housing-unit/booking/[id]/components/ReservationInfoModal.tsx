import {
    type PenaltyRange,
    useGetCompanyCancellationPolicy,
    useGetCompanyHostingRules,
} from '@booksuite/sdk'
import { ChevronRight, X } from 'lucide-react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { formatDate } from '@/common/utils/dayjs'

interface ReservationInfoModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    checkIn?: Date
    checkOut?: Date
    totalDays: number
    adults: number
    childrenCount: number
    mealPlans: string[]
    dailyPrices: Array<{
        date: Date
        price: number
    }>
    totalPrice: number
}

export const ReservationInfoModal: React.FC<ReservationInfoModalProps> = ({
    isOpen,
    onClose,
    title,
    checkIn,
    checkOut,
    totalDays,
    adults,
    childrenCount,
    mealPlans,
    dailyPrices,
    totalPrice,
}) => {
    const { company } = useCurrentCompanyStore()
    const { data: cancellationPolicy } = useGetCompanyCancellationPolicy(
        { companyId: company?.id ?? '' },
        {
            query: {
                enabled: !!company?.id && isOpen,
            },
        },
    )
    const { data: hostingRules } = useGetCompanyHostingRules(
        { companyId: company?.id ?? '' },
        {
            query: {
                enabled: !!company?.id && isOpen,
            },
        },
    )

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn duration-150">
            <div className="bg-white rounded-lg p-8 max-w-xl w-full mx-4 animate-scaleIn duration-150">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-medium">
                        Informações da reserva
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-grey-secondary hover:text-grey-primary"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl">{title}</h3>

                    <ul className="space-y-3">
                        <li>
                            • Chegada:{' '}
                            {checkIn &&
                                formatDate(checkIn, 'DD/MM/YYYY[- após ]') +
                                    formatTime(hostingRules?.checkIn ?? 0)}
                        </li>
                        <li>
                            • Saída:{' '}
                            {checkOut &&
                                formatDate(checkOut, 'DD/MM/YYYY[- até ]') +
                                    formatTime(hostingRules?.checkOut ?? 0)}
                        </li>
                        <li>• Total de diárias: {totalDays}</li>
                        <li>• Adultos: {adults}</li>
                        {childrenCount > 0 && (
                            <li>• Crianças: {childrenCount}</li>
                        )}
                        {mealPlans.length > 0 && (
                            <li>• Opcionais: {mealPlans.join(', ')}</li>
                        )}
                    </ul>

                    <div>
                        <h4 className="text-lg font-regular mb-3">
                            Valor por noite
                        </h4>
                        <ul className="space-y-2">
                            {dailyPrices.map(({ date, price }) => (
                                <li
                                    key={date.toISOString()}
                                    className="flex gap-2"
                                >
                                    <span>
                                        • {formatDate(date, 'DD/MM/YYYY')}
                                    </span>
                                    <span>
                                        R${' '}
                                        {price.toLocaleString('pt-BR', {
                                            minimumFractionDigits: 2,
                                        })}
                                    </span>
                                </li>
                            ))}
                            <li className="flex gap-2 font-regular pt-2">
                                <span>• Total:</span>
                                <span>
                                    R${' '}
                                    {totalPrice.toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                    })}
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        {(cancellationPolicy?.penaltyRanges ?? []).length >
                            0 && (
                            <>
                                <h4 className="text-lg font-medium mb-3">
                                    Políticas de cancelamento
                                </h4>
                                <div className="space-y-3 text-sm">
                                    {(cancellationPolicy?.penaltyRanges ?? [])
                                        .sort(
                                            (a, b) =>
                                                b.daysBeforeCheckIn -
                                                a.daysBeforeCheckIn,
                                        )
                                        .map(
                                            (
                                                rule: PenaltyRange,
                                                index: number,
                                            ) => (
                                                <p key={rule.id || index}>
                                                    • Cancelamento ou troca até{' '}
                                                    {rule.daysBeforeCheckIn}{' '}
                                                    dias de antecedência da data
                                                    de entrada:{' '}
                                                    <span className="font-medium">
                                                        Cobrança de {rule.value}
                                                        % do valor total da
                                                        reserva
                                                    </span>
                                                </p>
                                            ),
                                        )}
                                </div>
                            </>
                        )}
                        <div className="flex flex-row justify-between mt-4 items-center w-[90%]">
                            <a className="text-grey-primary underline cursor-pointer">
                                Políticas de reservas, cancelamento e cookies
                            </a>
                            <ChevronRight className="w-6 h-6 text-grey-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
