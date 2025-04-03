import { InternalMenu } from '@/components/organisms/InternalMenu'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Route } from 'next'
import React from 'react'
import { BadgePercent, CalendarDays, Gift } from 'lucide-react'

type MenuItem = {
    icon: React.ReactNode
    title: string
    href: Route
}

const menuItems: MenuItem[] = [
    {
        icon: <CalendarDays size={20} />,
        title: 'Regras de Temporada',
        href: '/my-business/prices-and-periods/season-rules',
    },
    {
        icon: <Gift size={20} />,
        title: 'Pacotes e Feriados',
        href: '/my-business/prices-and-periods/packages-and-holidays',
    },
    {
        icon: <BadgePercent size={20} />,
        title: 'Ofertas e Cupons',
        href: '/my-business/prices-and-periods/offers-and-coupons',
    },
]

export default function PricesAndPeriods() {
    return (
        <div className="prices_and_periods">
            <PageHeader
                title="Preços e Períodos"
                backLButtonLabel="Meu Negócio"
                backButtonHref="/my-business"
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
