import { Archive, CircleDollarSign, CirclePlus, Home, Wine } from 'lucide-react'
import { Route } from 'next'

import { InternalMenu } from '@/components/organisms/InternalMenu'
import { PageHeader } from '@/components/organisms/PageHeader'

type MenuItem = {
    icon: React.ReactNode
    title: string
    href: Route
}

const menuItems: MenuItem[] = [
    {
        icon: <Home size={20} />,
        title: 'Acomodações',
        href: '/my-business/rooms',
    },
    {
        icon: <CircleDollarSign size={20} />,
        title: 'Preços e Períodos',
        href: '/my-business/precos-e-periodos',
    },
    {
        icon: <CirclePlus size={20} />,
        title: 'Extras',
        href: '/my-business/services',
    },
    {
        icon: <Wine size={20} />,
        title: 'Serviços',
        href: '/my-business/services',
    },
    {
        icon: <Archive size={20} />,
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
