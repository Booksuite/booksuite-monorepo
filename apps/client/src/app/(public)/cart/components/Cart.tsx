'use client'

import { ChevronRight, ShoppingCart, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { useCart } from '@/common/hooks/useCart'
import { formatCurrency } from '@/common/utils/formatCurrency'

export function Cart() {
    const cart = useCart()
    const { housingUnits, services, removeFromCart } = cart

    function getDaysDifference(checkIn: Date, checkOut: Date) {
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    if (housingUnits.length === 0 && services.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 border border-grey-200 bg-white rounded-xl text-center">
                <div className="border border-grey-200 rounded-full p-6 mb-6">
                    <ShoppingCart className="w-12 h-12 text-primary-500" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                    Sem itens no carrinho!
                </h2>
                <p className="text-gray-600 mb-8">
                    Adicione acomodações, extras e experiências e monte a viagem
                    do seu jeito.
                </p>
                <div className="flex flex-col gap-4">
                    <Link
                        href="/housing-unit"
                        className="bg-primary-500 flex flex-row justify-center items-center gap-2 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-600 transition-colors"
                    >
                        Escolher uma acomodação
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/"
                        className="border border-primary-500 flex flex-row text-center items-center gap-2 text-primary-500 px-6 py-3 rounded-md font-medium hover:bg-primary-50 transition-colors"
                    >
                        Adicionar experiências e extras
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        )
    }

    const totalItems = housingUnits.length + services.length

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 bg-white rounded-xl border border-grey-200 p-6">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-medium">Meu Carrinho</h1>
                    <span className="text-gray-500">
                        ({totalItems} item{totalItems > 1 ? 's' : ''})
                    </span>
                </div>

                {housingUnits.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-medium mb-4">
                            Acomodações
                        </h2>
                        {housingUnits.map((item) => (
                            <div key={item.id}>
                                <div className="flex gap-6">
                                    <div className="relative w-32 h-32 rounded-md overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-xl text-grey-primary mb-2">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-grey-secondary">
                                                    {getDaysDifference(
                                                        item.checkIn,
                                                        item.checkOut,
                                                    )}{' '}
                                                    diárias,{' '}
                                                    {item.checkIn.toLocaleDateString(
                                                        'pt-BR',
                                                    )}{' '}
                                                    a{' '}
                                                    {item.checkOut.toLocaleDateString(
                                                        'pt-BR',
                                                    )}
                                                    , para {item.guests}{' '}
                                                    {item.guests === 1
                                                        ? 'hóspede'
                                                        : 'hóspedes'}
                                                    {item.mealPlan
                                                        ? `, ${item.mealPlan}`
                                                        : ''}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                className="text-grey-secondary hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="mt-6 flex justify-between items-center">
                                            <p className="font-medium text-xl text-grey-primary">
                                                {formatCurrency(item.price)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    <div className="border-t-2 pt-4 border-grey-200">
                        <button className="text-primary-500 font-medium mt-2 hover:text-primary-600 transition-colors ">
                            + Adicionar
                        </button>
                        <h2 className="text-xl font-medium my-4">
                            Itens adicionais
                        </h2>
                        {services.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {services.map((service) => (
                                    <div key={service.id}>
                                        <div className="flex gap-6">
                                            <div className="relative w-32 h-32 rounded-md overflow-hidden">
                                                <Image
                                                    src={service.image}
                                                    alt={service.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium text-xl text-grey-primary mb-2">
                                                            {service.name}
                                                        </h3>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            removeFromCart(
                                                                service.id,
                                                            )
                                                        }
                                                        className="text-grey-secondary hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <div className="mt-6 flex justify-between items-center">
                                                    <p className="font-medium text-xl text-grey-primary">
                                                        {formatCurrency(
                                                            service.price,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-grey-100 rounded-md p-8 text-center">
                                <p className="text-grey-secondary">
                                    Nenhuma experiência ou extra
                                </p>
                                <button className="text-primary-500 font-medium mt-2 hover:text-primary-600 transition-colors">
                                    + Adicionar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
