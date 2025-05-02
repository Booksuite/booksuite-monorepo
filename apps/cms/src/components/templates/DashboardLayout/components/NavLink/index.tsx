import { Box, Link, styled } from '@mui/material'
import type { LucideIcon } from 'lucide-react'
import type { Route } from 'next'
import NextLink from 'next/link'

const NavButton = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    width: '100%',
    height: '48px',
    backgroundColor: isActive ? theme.palette.blue[500] : 'transparent',
    color: isActive ? 'white' : '#B8B8CF',
    fontWeight: 600,
    fontSize: 15,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    transition: 'all 0.2s',
    '&:hover': {
        backgroundColor: isActive
            ? theme.palette.primary.main
            : 'rgba(255, 255, 255, 0.1)',
    },
}))

export interface NavLinkProps {
    href: Route
    label: string
    isActive?: boolean
    icon?: LucideIcon
}

export const NavLink: React.FC<NavLinkProps> = ({
    href,
    label,
    isActive,
    icon: Icon,
}) => {
    const content = (
        <NavButton
            isActive={isActive}
            sx={{
                justifyContent: 'flex-start',
            }}
        >
            {Icon && <Icon size={20} />}
            {label}
        </NavButton>
    )

    return (
        <Link
            component={NextLink}
            href={href as Route}
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
    )
}
