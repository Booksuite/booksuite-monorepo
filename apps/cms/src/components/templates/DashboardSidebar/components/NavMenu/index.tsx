import { Stack } from '@mui/material'
import { usePathname } from 'next/navigation'

import { NavLink } from './components/NavLink'
import type { NavMenuProps } from './types'

export const NavMenu: React.FC<NavMenuProps> = ({ links, isCollapsed }) => {
    const pathname = usePathname()

    return (
        <Stack component="nav" spacing={1}>
            {links.map((link) => (
                <NavLink
                    key={link.href}
                    href={link.href}
                    isActive={pathname === link.href}
                    icon={link.icon}
                    isCollapsed={isCollapsed}
                >
                    {link.label}
                </NavLink>
            ))}
        </Stack>
    )
}
