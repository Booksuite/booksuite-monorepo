import { InternalMenu } from '@/components/organisms/InternalMenu'
import { PageHeader } from '@/components/organisms/PageHeader'
import CalendarIcon from '@/components/svgs/icons/CalendarIcon'
import DiscountIcon from '@/components/svgs/icons/DiscountIcon'
import GiftIcon from '@/components/svgs/icons/GiftIcon'

export interface PrecosEPeriodosProps {}

export default function PrecosEPeriodos(props: PrecosEPeriodosProps) {
    const menuItems: MenuItem[] = [
        {
            icon: <CalendarIcon />,
            title: 'Regras de Temporada',
            href: '/my-business/precos-e-periodos/regras-de-temporada',
        },
        {
            icon: <GiftIcon />,
            title: 'Pacotes e Feriados',
            href: '/my-business/precos-e-periodos/pacotes-e-feriados',
        },
        {
            icon: <DiscountIcon />,
            title: 'Ofertas e Cupons',
            href: '/my-business/precos-e-periodos/ofertas-e-cupons',
        },
    ]

    return (
        <div className="PrecosEPeriodos">
            <PageHeader.Root>
                <PageHeader.BackLink href="/my-business">
                    Meu Negócio
                </PageHeader.BackLink>

                <PageHeader.Title>Preços e Períodos</PageHeader.Title>
            </PageHeader.Root>

            <InternalMenu.Root>
                {menuItems.map((item) => (
                    <InternalMenu.Button
                        key={item.href}
                        icon={item.icon}
                        title={item.title}
                        href={item.href}
                    />
                ))}
            </InternalMenu.Root>
        </div>
    )
}
