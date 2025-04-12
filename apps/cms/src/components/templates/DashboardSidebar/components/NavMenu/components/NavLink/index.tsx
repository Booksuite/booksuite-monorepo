import { Box, Link, styled, Tooltip } from '@mui/material'
import type { LucideIcon } from 'lucide-react'
import type { Route } from 'next'
import NextLink from 'next/link'

import type { NavLinkProps } from '../../types'

const NavButton = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isCollapsed',
})<{ isActive?: boolean; isCollapsed?: boolean }>(({ theme, isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    width: '100%',
    backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
    color: 'white',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
    transition: 'all 0.2s',
    '&:hover': {
        backgroundColor: isActive
            ? theme.palette.primary.main
            : 'rgba(255, 255, 255, 0.1)',
    },
}))

export const NavLink = ({
    href,
    children,
    isActive,
    icon: Icon,
    isCollapsed,
}: NavLinkProps & {
    icon?: LucideIcon
    isCollapsed?: boolean
}) => {
    const content = (
        <NavButton
            isActive={isActive}
            isCollapsed={isCollapsed}
            sx={{
                justifyContent: isCollapsed ? 'center' : 'flex-start',
            }}
        >
            {Icon && <Icon size={20} />}
            {!isCollapsed && children}
        </NavButton>
    )

    const linkProps = {
        href: href as Route,
        passHref: true,
        legacyBehavior: true,
    }

    return isCollapsed ? (
        <Tooltip title={children} placement="right">
            <NextLink {...linkProps}>
                <Link
                    sx={{
                        display: 'block',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'none',
                        },
                    }}
                >
                    {content}
                </Link>
            </NextLink>
        </Tooltip>
    ) : (
        <NextLink {...linkProps}>
            <Link
                sx={{
                    display: 'block',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'none',
                    },
                }}
            >
                {content}
            </Link>
        </NextLink>
    )
}
