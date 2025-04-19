import { Button } from '@/components/atoms/Button'
import { Container } from '@/components/organisms/Container'
import { Search } from 'lucide-react'

export const OthersHome: React.FC = () => {
    return (
        <div className="bg-grey-100">
            <Container>
                <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4 py-8 md:py-12">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-grey-primary mb-3 md:mb-4 max-w-4xl">
                        Tem interesse em reservar?
                    </h1>
                    <p className="text-base md:text-xl lg:text-xl text-grey-secondary mb-6 md:mb-8">
                        Utilize a busca abaixo e efetue sua reserva online.
                    </p>

                    <div className="w-full max-w-4xl bg-white rounded-xl border border-grey-200 p-4 md:p-6">
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
                                <Button
                                    variant="outline"
                                    className="flex-1 md:flex-none border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-6 py-3 min-w-[120px]"
                                >
                                    Reservar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
