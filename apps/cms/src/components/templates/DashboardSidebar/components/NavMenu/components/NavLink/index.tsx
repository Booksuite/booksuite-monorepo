import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'

import type { NavLinkProps } from '../../types'

export const NavLink = ({ href, children, isActive }: NavLinkProps) => (
    <Link
        as={NextLink}
        href={href}
        display="block"
        py={3}
        px={4}
        fontSize="lg"
        fontWeight="medium"
        color={isActive ? 'orange.500' : 'white'}
        _hover={{
            color: 'orange.500',
            transform: 'translateX(4px)',
            transition: 'all 0.2s',
        }}
        transition="all 0.2s"
        textDecoration="none"
    >
        {children}
    </Link>
)
