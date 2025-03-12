import { InternalMenu } from '@/components/organisms/InternalMenu'
import { PageHeader } from '@/components/organisms/PageHeader'
import CalendarIcon from '@/components/svgs/icons/CalendarIcon'
import DiscountIcon from '@/components/svgs/icons/DiscountIcon'
import GiftIcon from '@/components/svgs/icons/GiftIcon'

export interface PrecosEPeriodosProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PrecosEPeriodos(props: PrecosEPeriodosProps) {
    return (
        <div className="PrecosEPeriodos">
            <PageHeader.Root>
                <PageHeader.BackLink href="/my-business">
                    Meu Negócio
                </PageHeader.BackLink>

                <PageHeader.Title>Preços e Períodos</PageHeader.Title>
            </PageHeader.Root>

            <InternalMenu.Root>
                <InternalMenu.Button href="precos-e-periodos/regras-de-temporada">
                    <CalendarIcon />
                    Regras de Temporada
                </InternalMenu.Button>

                <InternalMenu.Button href="precos-e-periodos/pacotes-e-feriados">
                    <GiftIcon />
                    Pacotes e Feriados
                </InternalMenu.Button>

                <InternalMenu.Button href="precos-e-periodos/ofertas-e-cupons">
                    <DiscountIcon />
                    Ofertas e Cupons
                </InternalMenu.Button>
            </InternalMenu.Root>
        </div>
    )
}
