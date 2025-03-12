import { InternalMenu } from '@/components/organisms/InternalMenu'
import { PageHeader } from '@/components/organisms/PageHeader'
import CalendarIcon from '@/components/svgs/icons/CalendarIcon'
import DiscountIcon from '@/components/svgs/icons/DiscountIcon'
import GiftIcon from '@/components/svgs/icons/GiftIcon'

export interface PrecosEPeriodosProps {}

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
                <InternalMenu.Button
                    href="/my-business/precos-e-periodos/regras-de-temporada"
                    icon={<CalendarIcon />}
                    title="Regras de Temporada"
                >
                    Regras de Temporada
                </InternalMenu.Button>

                <InternalMenu.Button
                    href="/my-business/precos-e-periodos/pacotes-e-feriados"
                    icon={<GiftIcon />}
                    title="Pacotes e Feriados"
                >
                    Pacotes e Feriados
                </InternalMenu.Button>

                <InternalMenu.Button
                    href="/my-business/precos-e-periodos/ofertas-e-cupons"
                    icon={<DiscountIcon />}
                    title="Ofertas e Cupons"
                >
                    Ofertas e Cupons
                </InternalMenu.Button>
            </InternalMenu.Root>
        </div>
    )
}
