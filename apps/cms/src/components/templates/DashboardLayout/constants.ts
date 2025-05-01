import { Building2, Home, Map, Megaphone, Settings } from 'lucide-react'

import { NavLinkProps } from './components/NavLink'

export const DRAWER_WIDTH = 280
export const DRAWER_WIDTH_COLLAPSED = 0

export const MAIN_MENU_ITEMS: NavLinkProps[] = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/map', label: 'Mapa', icon: Map },
    { href: '/my-business', label: 'Meu negócio', icon: Building2 },
    { href: '/marketing', label: 'Marketing', icon: Megaphone },
    { href: '/settings', label: 'Configurações', icon: Settings },
]
