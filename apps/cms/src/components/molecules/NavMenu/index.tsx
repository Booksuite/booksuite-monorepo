import { VStack } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

import { NavLink } from '@/components/molecules/NavMenu/components/NavLink'

import { NavMenuProps } from './types'

export const NavMenu = ({ links, isFooter }: NavMenuProps) => {
    const pathname = usePathname()

    return (
        <VStack as="nav" spacing={6} align="stretch">
            {links.map((link) => (
                <NavLink
                    key={link.href}
                    href={link.href}
                    isActive={pathname === link.href}
                >
                    {link.label}
                </NavLink>
            ))}
        </VStack>
    )
}
