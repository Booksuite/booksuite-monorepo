import { VStack } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

import { NavLink } from './components/NavLink'

import type { NavMenuProps } from './types'

export const NavMenu: React.FC<NavMenuProps> = ({ links }) => {
    const pathname = usePathname()

    return (
        <VStack as="nav" spacing={1} align="stretch">
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
