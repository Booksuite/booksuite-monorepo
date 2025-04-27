'use client'

import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { useCart } from '@/common/hooks/useCart'
import { formatCurrency } from '@/common/utils/formatCurrency'
import { InputText } from '@/components/atoms/InputText'

export function ReservationSummary() {
    const cart = useCart()
    const { housingUnits, services, total } = cart
    const [isPromoCodeVisible, setIsPromoCodeVisible] = useState(false)
    const [promoCode, setPromoCode] = useState('')

    const housingUnitTotal = housingUnits.reduce(
        (acc, item) => acc + item.price,
        0,
    )
    const additionalItemsTotal = services.reduce(
        (acc, item) => acc + item.price,
        0,
    )
    const discountsTotal = 0

    const pixDiscount = total * 0.1
    const installmentValue = total / 10

    const hasItems = housingUnits.length > 0 || services.length > 0

    return (
        <div className="bg-white rounded-xl border border-grey-200 p-6">
            <h2
                className={`text-xl font-semibold mb-4 ${hasItems ? 'text-grey-primary' : 'text-grey-secondary'}`}
            >
                Resumo da reserva
            </h2>
            <div className="border-t border-grey-200 pt-4 -mx-6" />

            {!hasItems ? (
                <div className="text-grey-secondary text-sm">
                    <p>
                        Assim que adicionar acomodações e itens em seu carrinho,
                        você encontrará os valores da sua reserva aqui.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-grey-secondary">Acomodações</span>
                        <span className="font-medium">
                            {formatCurrency(housingUnitTotal)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-grey-secondary">
                            Itens adicionais
                        </span>
                        <span className="font-medium">
                            {formatCurrency(additionalItemsTotal)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-grey-secondary">Descontos</span>
                        <span className="font-medium">
                            {formatCurrency(discountsTotal)}
                        </span>
                    </div>

                    <div className="pt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-grey-secondary">
                                Código Promocional
                            </span>
                            <button
                                className="text-primary-500 font-medium"
                                onClick={() =>
                                    setIsPromoCodeVisible(!isPromoCodeVisible)
                                }
                            >
                                {!isPromoCodeVisible ? 'Aplicar' : 'Remover'}
                            </button>
                        </div>
                        {isPromoCodeVisible && (
                            <div className="mt-2">
                                <InputText
                                    label="Digite o código promocional"
                                    value={promoCode}
                                    onChange={(e) =>
                                        setPromoCode(e.target.value)
                                    }
                                />
                            </div>
                        )}
                    </div>

                    <div className="border-t border-grey-200 pt-4 -mx-6" />

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold text-grey-primary">
                                Total
                            </span>
                            <span className="text-lg font-semibold text-grey-primary">
                                {formatCurrency(total)}
                            </span>
                        </div>

                        <div className="text-sm text-systemColors-green items-end font-medium mb-2 text-right">
                            {formatCurrency(total - pixDiscount)} à vista no pix
                            (-10%)
                        </div>

                        <div className="text-sm text-grey-secondary">
                            ou até{' '}
                            <strong>
                                10x de {formatCurrency(installmentValue)}
                            </strong>{' '}
                            s/ juros no cartão de crédito
                        </div>
                    </div>

                    <button className="w-full bg-primary-500 text-white rounded-md py-3 px-4 font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
                        Ir para o pagamento
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    )
}
