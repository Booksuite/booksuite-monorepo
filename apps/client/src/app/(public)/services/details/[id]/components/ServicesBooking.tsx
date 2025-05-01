import { Info, Minus, Plus, Share2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/atoms/Button'
import { PriceDisplay } from '@/components/molecules/PriceDisplay'
import { formatCurrency } from '@/common/utils/formatCurrency'

interface ServicesBookingProps {
    name: string
    prices: number
    billingType: string
    onQuantityChange?: (quantity: number) => void
}

export const ServicesBooking: React.FC<ServicesBookingProps> = ({
    name,
    prices,
    billingType,
    onQuantityChange,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [quantity, setQuantity] = useState(0)

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 0) {
            setQuantity(newQuantity)
            onQuantityChange?.(newQuantity)
        }
    }

    const totalPrice = prices * quantity

    const handleAddToCart = () => {
        // TODO: Implement actual cart functionality
        setIsModalOpen(true)
    }

    const billingTypeLabel = () => {
        switch (billingType) {
            case 'PER_GUEST_DAILY':
                return 'Por hóspede por dia'
            case 'PER_GUEST':
                return 'Por hóspede'
            case 'DAILY':
                return 'Por dia'
            case 'PER_RESERVATION':
                return 'Por reserva'
            case 'PER_HOUSING_UNIT':
                return 'Por unidade'
        }
    }

    return (
        <div className="w-full max-w-xl px-4">
            <div className="w-full flex items-center flex-row justify-between text-grey-primary">
                <h1 className="text-2xl font-medium">{name}</h1>
                <div className="rounded-full p-3 border border-grey-200 hover:bg-systemColors-blueLight border-none transition-all duration-300 cursor-pointer">
                    <Share2 className="w-6 h-6" />
                </div>
            </div>

            <div className="w-full mt-10">
                <div className="flex flex-col gap-8">
                    <div className="flex-1">
                        <h2 className="text-md font-regular text-grey-primary mb-2">
                            Quantas unidades você deseja?
                        </h2>
                        <div className="flex flex-row border border-grey-200 rounded-md p-3 items-center">
                            <div className="flex-1 text-grey-secondary">
                                <span>Quantidade</span>
                            </div>
                            <div className="flex-1 flex flex-row items-center gap-4 justify-end">
                                <button
                                    onClick={() =>
                                        handleQuantityChange(quantity - 1)
                                    }
                                    disabled={quantity === 0}
                                    className="w-8 h-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-grey-200 rounded-full hover:bg-systemColors-blueLight hover:text-primary-700 hover:border-primary-700 transition-all duration-300 border-2 border-primary-500 items-center justify-center"
                                >
                                    <Minus className="w-6 h-6 text-primary-500 mx-auto" />
                                </button>
                                <span className="text-lg font-medium text-grey-primary">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        handleQuantityChange(quantity + 1)
                                    }
                                    className="w-8 h-8 rounded-full hover:bg-systemColors-blueLight hover:text-primary-700 hover:border-primary-700 transition-all duration-300 border-2 border-primary-500 items-center justify-center"
                                >
                                    <Plus className="w-6 h-6 text-primary-500 mx-auto" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center gap-2">
                                <h2 className="text-lg font-medium text-grey-primary mb-2">
                                    {formatCurrency(totalPrice)}
                                </h2>
                                <span className="text-sm text-grey-secondary">
                                    {billingTypeLabel()}
                                </span>
                            </div>
                            <span className="text-sm text-grey-secondary">
                                em até{' '}
                                <strong>
                                    10x de {formatCurrency(totalPrice / 10)}
                                </strong>{' '}
                                sem juros no cartão de crédito
                            </span>
                        </div>
                        <Button
                            className="w-full bg-primary-500 text-white hover:bg-primary-600 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleAddToCart}
                        >
                            Adicionar ao carrinho
                        </Button>
                        <span className="text-md flex flex-row items-center gap-2 text-grey-secondary">
                            <Info className="w-4 h-4" />
                            Item adicional a reserva de uma acomodação.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
