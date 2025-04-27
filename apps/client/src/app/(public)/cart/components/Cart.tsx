import { ChevronRight, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export function Cart() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 border border-grey-200 bg-white rounded-md text-center">
            <div className="border border-grey-200 rounded-full p-6 mb-6">
                <ShoppingCart className="w-12 h-12 text-primary-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
                Sem itens no carrinho!
            </h2>
            <p className="text-gray-600 mb-8">
                Adicione acomodações, extras e experiências e monte a viagem do
                seu jeito.
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
