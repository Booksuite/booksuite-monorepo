import { ReactNode } from 'react'

export interface LinkItem {
    href: string
    label: string
}

export interface NavMenuProps {
    links: LinkItem[]
    isFooter?: boolean
}

export interface NavLinkProps {
    href: string
    children: ReactNode
    isActive?: boolean
}
