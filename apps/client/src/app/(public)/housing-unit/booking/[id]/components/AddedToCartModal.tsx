import { Loader2, SquareCheckBig } from 'lucide-react'
import { useEffect, useState } from 'react'

interface AddedToCartModalProps {
    isOpen: boolean
    onAddMore: () => void
    onAdvance: () => void
}

export const AddedToCartModal: React.FC<AddedToCartModalProps> = ({
    isOpen,
    onAddMore,
    onAdvance,
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsLoading(true)
            setShowContent(false)
            const loadingTimer = setTimeout(() => {
                setIsLoading(false)
            }, 1000)

            const contentTimer = setTimeout(() => {
                setShowContent(true)
            }, 100)

            return () => {
                clearTimeout(loadingTimer)
                clearTimeout(contentTimer)
            }
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
            <div
                className={`bg-white rounded-lg p-8 gap-4 max-w-md w-full mx-4 flex flex-col items-center
                ${showContent ? 'animate-slideDown' : 'opacity-0'}`}
            >
                <div className="h-12 w-12 flex items-center justify-center">
                    {isLoading ? (
                        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
                    ) : (
                        <SquareCheckBig
                            className={`w-12 h-12 text-primary-500 
                            ${showContent ? 'animate-scaleIn' : 'opacity-0'}`}
                        />
                    )}
                </div>
                <h2
                    className={`text-xl font-medium text-center mb-4 transition-opacity duration-200
                    ${showContent ? 'opacity-100' : 'opacity-0'}`}
                >
                    Acomodação adicionada ao carrinho
                </h2>
                <button
                    onClick={onAddMore}
                    className={`w-full border border-primary-500 text-primary-500 rounded-md py-3 hover:bg-primary-50 transition-opacity duration-200
                    ${showContent ? 'opacity-100' : 'opacity-0'}`}
                >
                    + Adicionar mais acomodações
                </button>
                <button
                    onClick={onAdvance}
                    className={`w-full bg-primary-500 text-white rounded-md py-3 transition-all duration-200 hover:bg-primary-600
                    ${showContent ? 'opacity-100' : 'opacity-0'}`}
                >
                    Avançar
                </button>
            </div>
        </div>
    )
}
