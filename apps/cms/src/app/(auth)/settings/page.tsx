import {
    Archive,
    AtSign,
    Baby,
    BadgePercent,
    File,
    Home,
    Hotel,
    MapPin,
    Pencil,
    ScanText,
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
        icon: <Home size={20} />,
        title: 'Dados gerais',
        href: `/settings/general`,
    },
    {
        icon: <Hotel size={20} />,
        title: 'Descrição do Negócio',
        href: `/settings/business-description`,
    },
    {
        icon: <MapPin size={20} />,
        title: 'Endereço',
        href: `/settings/address`,
    },
    {
        icon: <Pencil size={20} />,
        title: 'Identidade Visual',
        href: `/settings/visual-identity`,
    },
    // {
    //     icon: <Telescope size={20} />,
    //     title: 'Comodidades',
    //     href: `/settings/comodidades`,
    // },
    {
        icon: <AtSign size={20} />,
        title: 'Contato e Redes Sociais',
        href: `/settings/contacts-social-media`,
    },
    {
        icon: <Archive size={20} />,
        title: 'Informações Fiscais',
        href: `/settings/tax-information`,
    },
    {
        icon: <BadgePercent size={20} />,
        title: 'Regras de Hospedagem',
        href: `/settings/hosting-rules`,
    },
    // {
    //     icon: <CircleDollarSign size={20} />,
    //     title: 'Formas de Pagamento',
    //     href: `/settings/formas-de-pagamento`,
    // },
    // {
    //     icon: <FileText size={20} />,
    //     title: 'Políticas de Reservas',
    //     href: `/settings/politicas-de-reservas`,
    // },
    {
        icon: <File size={20} />,
        title: 'Políticas de Cancelamento',
        href: `/settings/cancellation-policy`,
    },
    {
        icon: <Baby size={20} />,
        title: 'Política de Idade',
        href: `/settings/age-policy`,
    },
    {
        icon: <ScanText size={20} />,
        title: 'Política de Privacidade',
        href: `/settings/privacy-policy`,
    },
    // {
    //     icon: <UserRound size={20} />,
    //     title: 'Usuários e Permissões',
    //     href: `/settings/users-and-permissions`,
    // },
]

export default function Settings() {
    return (
        <div>
            <PageHeader
                title="Configurações"
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
