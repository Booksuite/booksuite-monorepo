import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export interface LinkItem {
    href: string
    label: string
    icon?: LucideIcon | (() => JSX.Element)
    isFooter?: boolean
}

export interface NavMenuProps {
    links: LinkItem[]
    isCollapsed?: boolean
    isFooter?: boolean
}

export interface NavLinkProps {
    href: string
    children: ReactNode
    isActive?: boolean
    isCollapsed?: boolean
    icon?: LucideIcon | (() => JSX.Element)
    isFooter?: boolean
}
