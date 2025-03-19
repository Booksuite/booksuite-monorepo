import { Route } from 'next'

import { InternalMenu } from '@/components/organisms/InternalMenu'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'
import BoxIcon from '@/components/svgs/icons/BoxIcon'
import HomeIcon from '@/components/svgs/icons/HomeIcon'
import MoneyIcon from '@/components/svgs/icons/MoneyIcon'

type MenuItem = {
    icon: React.ReactNode
    title: string
    href: Route
}

const menuItems: MenuItem[] = [
    {
        icon: <HomeIcon />,
        title: 'Dados gerais',
        href: `/settings/dados-gerais`,
    },
    {
        icon: <Icons.Hotel />,
        title: 'Descrição do Negócio',
        href: `/settings/descricao-do-negocio`,
    },
    {
        icon: <Icons.Marker />,
        title: 'Endereço',
        href: `/settings/endereco`,
    },
    {
        icon: <Icons.Pencil />,
        title: 'Identidade Visual',
        href: `/settings/identidade-visual`,
    },
    {
        icon: <Icons.Pool />,
        title: 'Comodidades',
        href: `/settings/comodidades`,
    },
    {
        icon: <Icons.At />,
        title: 'Contato e Redes Sociais',
        href: `/settings/contato-e-redes-sociais`,
    },
    {
        icon: <BoxIcon />,
        title: 'Informações Fiscais',
        href: `/settings/informacoes-fiscais`,
    },
    {
        icon: <Icons.Offer />,
        title: 'Regras de Hospedagem',
        href: `/settings/regras-de-hospedagem`,
    },
    {
        icon: <MoneyIcon />,
        title: 'Formas de Pagamento',
        href: `/settings/formas-de-pagamento`,
    },
    {
        icon: <Icons.Document />,
        title: 'Políticas de Reservas',
        href: `/settings/politicas-de-reservas`,
    },
    {
        icon: <Icons.File />,
        title: 'Políticas de Cancelamento',
        href: `/settings/politicas-de-cancelamento`,
    },
    {
        icon: <Icons.Children />,
        title: 'Política de Idade',
        href: `/settings/politica-de-idade`,
    },
    {
        icon: <Icons.List />,
        title: 'Política de Privacidade',
        href: `/settings/politica-de-privacidade`,
    },
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
