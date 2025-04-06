import { LucideIcon } from 'lucide-react'
import { Route } from 'next'
import { ReactNode } from 'react'

export interface LinkItem {
    href: Route
    label: string
    icon?: LucideIcon
}

export interface NavMenuProps {
    links: LinkItem[]
    isFooter?: boolean
    isCollapsed?: boolean
}

export interface NavLinkProps {
    href: string
    children: ReactNode
    isActive?: boolean
    isCollapsed?: boolean
}
