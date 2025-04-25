import { HelpCircle } from 'lucide-react'

import { formatCurrency } from '@/common/utils/formatCurrency'

interface PriceDisplayProps {
    totalPrice: number
    pixDiscount?: number
    maxInstallments?: number
    onHelpClick?: () => void
    offer?: {
        type: 'percentage' | 'absolute'
        value: number
    }
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
    totalPrice,
    pixDiscount,
    maxInstallments,
    onHelpClick,
    offer,
}) => {
    const finalPrice = offer
        ? offer.type === 'percentage'
            ? totalPrice * (1 - offer.value / 100)
            : totalPrice - offer.value
        : totalPrice

    const pixPrice = finalPrice * (1 - (pixDiscount ?? 0) / 100)
    const installmentPrice = finalPrice / (maxInstallments ?? 1)
    const discountPercentage = offer
        ? offer.type === 'percentage'
            ? offer.value
            : Math.round((offer.value / totalPrice) * 100)
        : 0

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-lg text-grey-secondary">Total:</span>
                    <div className="flex items-center gap-2">
                        {offer && offer.value > 0 && (
                            <>
                                <span className="text-lg font-regular text-grey-secondary line-through">
                                    {formatCurrency(totalPrice)}
                                </span>
                                <span className="text-sm font-medium px-2 py-1 rounded bg-orange-500 text-white">
                                    -{discountPercentage}%
                                </span>
                            </>
                        )}
                        <span className="text-lg font-regular text-grey-secondary">
                            {formatCurrency(finalPrice)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {onHelpClick && (
                        <button
                            onClick={onHelpClick}
                            className="text-grey-secondary hover:text-grey-primary transition-colors"
                        >
                            <HelpCircle className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold">
                    {formatCurrency(pixPrice)}{' '}
                    {pixDiscount && (
                        <span className="text-success-500 text-lg font-normal">
                            à vista no pix (-{pixDiscount}%)
                        </span>
                    )}
                </span>
                {maxInstallments && (
                    <span className="text-grey-secondary">
                        ou em até {maxInstallments}x de{' '}
                        {formatCurrency(installmentPrice)} sem juros no cartão
                        de crédito
                    </span>
                )}
            </div>
        </div>
    )
}
