import { Button } from '@/components/atoms/Button'
import { InputText } from '@/components/atoms/InputText'
import { Container } from '@/components/organisms/Container'

export const ReceiveOurPromotions: React.FC = () => {
    return (
        <Container>
            <div className="justify-between flex flex-col md:flex-row gap-20 items-center w-full">
                <div className="flex flex-col gap-4 w-full md:w-1/2 ">
                    <h1 className="text-3xl font-bold text-grey-primary mb-4">
                        Receba nossas promoções
                    </h1>
                    <span className="text-grey-secondary">
                        Cadastre-se agora e receba em primeira mão todas as
                        novidades, ofertas e lançamentos.
                    </span>
                </div>

                <div className="flex flex-col gap-4 w-full md:w-1/3">
                    <InputText label="Insira seu e-mail" className="w-full" />
                    <Button className="w-full bg-primary-500 text-white font-bold py-2 px-4 rounded-md hover:bg-primary-600">
                        Cadastrar
                    </Button>
                </div>
            </div>
        </Container>
    )
}
