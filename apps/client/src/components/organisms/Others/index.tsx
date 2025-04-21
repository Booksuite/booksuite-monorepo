import { SmartBannerSearch } from '@/components/molecules/SmartBannerSearch'
import { Container } from '@/components/organisms/Container'

interface OthersProps {
    showContent?: boolean
}

export const Others: React.FC<OthersProps> = ({ showContent = true }) => {
    return (
        <div className="bg-grey-100">
            <Container>
                {showContent && (
                    <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4 py-8 md:py-12">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-grey-primary mb-3 md:mb-4 max-w-4xl">
                            Tem interesse em reservar?
                        </h1>
                        <p className="text-base md:text-xl lg:text-xl text-grey-secondary mb-6 md:mb-8">
                            Utilize a busca abaixo e efetue sua reserva online.
                        </p>

                        <SmartBannerSearch />
                    </div>
                )}
            </Container>
        </div>
    )
}
