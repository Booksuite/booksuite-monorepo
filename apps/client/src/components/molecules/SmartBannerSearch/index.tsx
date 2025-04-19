import { Search } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

export interface SearchBannerProps {
    className?: string
    showBookButton?: boolean
}

export function SmartBannerSearch({
    className,
    showBookButton = true,
}: SearchBannerProps) {
    return (
        <div
            className={`w-full max-w-4xl bg-white rounded-xl shadow-lg p-4 md:p-6 ${className}`}
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-start w-full md:w-auto">
                    <h3 className="text-base md:text-lg font-semibold text-grey-primary mb-1">
                        Busca inteligente:
                    </h3>
                    <h4 className="text-sm md:text-base text-grey-secondary">
                        Datas · Experiências · Pacotes · Flexível
                    </h4>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button
                        variant="default"
                        className="flex-1 md:flex-none bg-primary-500 hover:bg-primary-700 text-white px-6 py-3 min-w-[120px]"
                    >
                        <Search className="mr-2 h-5 w-5" />
                        Pesquisar
                    </Button>
                    {showBookButton && (
                        <Button
                            variant="outline"
                            className="flex-1 md:flex-none border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-6 py-3 min-w-[120px]"
                        >
                            Reservar
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
