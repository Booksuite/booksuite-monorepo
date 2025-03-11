import { Route } from 'next'

import { InternalMenu } from '@/components/organisms/InternalMenu'
import { PageHeader } from '@/components/organisms/PageHeader'
import BoxIcon from '@/components/svgs/icons/BoxIcon'
import GlassesIcon from '@/components/svgs/icons/GlassesIcon'
import HomeIcon from '@/components/svgs/icons/HomeIcon'
import MoneyIcon from '@/components/svgs/icons/MoneyIcon'
import PlusIcon from '@/components/svgs/icons/PlusIcon'

type MenuItem = {
    icon: React.ReactNode
    title: string
    href: Route
}

const menuItems: MenuItem[] = [
    {
        icon: <HomeIcon />,
        title: 'Acomodações',
        href: '/my-business/rooms',
    },
    {
        icon: <MoneyIcon />,
        title: 'Preços e Períodos',
        href: '/my-business/precos-e-periodos',
    },
    {
        icon: <PlusIcon />,
        title: 'Extras',
        href: '/my-business/services',
    },
    {
        icon: <GlassesIcon />,
        title: 'Serviços',
        href: '/my-business/services',
    },
    {
        icon: <BoxIcon />,
        title: 'Opções de Tarifas',
        href: '/my-business/opcoes-de-tarifas',
    },
]

export default function MeuNegocio() {
    return (
        <div>
            <PageHeader
                title="Meu Negócio"
                backLButtonLabel="Início"
                backButtonHref="/"
            />

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
