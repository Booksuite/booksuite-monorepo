import { Sparkles, X } from 'lucide-react'
import { TravelReasons } from './TravelReasons'
import { Container } from '@/components/organisms/Container'
interface SmartSearchProps {
    openSmartSearch: boolean
    closeSmartSearch: () => void
}
import { useEffect } from 'react'

export const SmartSearch: React.FC<SmartSearchProps> = ({
    openSmartSearch,
    closeSmartSearch,
}) => {
    useEffect(() => {
        if (openSmartSearch) {
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }
    }, [openSmartSearch])

    return (
        <>
            {openSmartSearch && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="relative bg-white shadow-lg w-full h-full">
                        <header className="relative w-full h-20 bg-primary-500 px-6 flex justify-center items-center">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-white" />
                                <h1 className="text-xl font-semibold text-white">
                                    Busca inteligente
                                </h1>
                            </div>
                            <button
                                onClick={closeSmartSearch}
                                className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-white rounded-full hover:bg-systemColors-blueLight hover:text-primary-500 transition-all duration-300"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </header>

                        <Container>
                            <TravelReasons />
                        </Container>
                    </div>
                </div>
            )}
        </>
    )
}
