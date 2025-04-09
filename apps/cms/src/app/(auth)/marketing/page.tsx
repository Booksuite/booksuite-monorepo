'use client'

import {
    Bell,
    CircleHelp,
    FileText,
    Flag,
    Image,
    Laptop,
    Link2,
    Map,
    Newspaper,
    Star,
} from 'lucide-react'
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
        icon: <Flag size={20} />,
        title: 'Banners',
        href: `/marketing`,
    },
    {
        icon: <Bell size={20} />,
        title: 'Notificações',
        href: `/marketing`,
    },
    {
        icon: <FileText size={20} />,
        title: 'Páginas de Vendas e Promoções',
        href: `/marketing`,
    },
    {
        icon: <Image size={20} />,
        title: 'Galerias',
        href: `/marketing`,
    },
    {
        icon: <Newspaper size={20} />,
        title: 'Novidades',
        href: `/marketing`,
    },
    {
        icon: <Link2 size={20} />,
        title: 'Link Bio',
        href: `/marketing/utilityLinks`,
    },
    {
        icon: <Star size={20} />,
        title: 'Avaliações',
        href: `/marketing`,
    },
    {
        icon: <Map size={20} />,
        title: 'Roteiro e Guia de Hóspedes',
        href: `/marketing`,
    },
    {
        icon: <CircleHelp size={20} />,
        title: 'Roteiro e Guia de Hóspedes',
        href: `/marketing`,
    },
    {
        icon: <Laptop size={20} />,
        title: 'Integrações e Códigos',
        href: `/marketing`,
    },
]

export default function Marketing() {
    return (
        <div>
            <PageHeader
                title="Marketing"
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
