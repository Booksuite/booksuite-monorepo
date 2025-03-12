'use client'

import { VStack } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import type React from 'react'

import { NavLink } from './components/NavLink'
import type { NavMenuProps } from './types'

export const NavMenu: React.FC<NavMenuProps> = ({
    links,
    isCollapsed,
    isFooter,
}) => {
    const pathname = usePathname()

    return (
        <VStack
            as="nav"
            spacing={isFooter ? 0 : 0}
            align="stretch"
            width="full"
            mt={isFooter ? 'auto' : 0}
            pb={isFooter ? 4 : 0}
        >
            {links.map((link) => (
                <NavLink
                    key={link.href}
                    href={link.href}
                    isActive={pathname === link.href}
                    isCollapsed={isCollapsed}
                    icon={link.icon}
                    isFooter={link.isFooter || isFooter}
                >
                    {link.label}
                </NavLink>
            ))}
        </VStack>
    )
}
