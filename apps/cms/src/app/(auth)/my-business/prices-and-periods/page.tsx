import { BadgePercent, CalendarDays, Gift } from 'lucide-react'
import { Route } from 'next'
import React from 'react'

import { InternalMenu } from '@/components/organisms/InternalMenu'
import { PageHeader } from '@/components/organisms/PageHeader'

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
        href: '/my-business/prices-and-periods/special-dates',
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
