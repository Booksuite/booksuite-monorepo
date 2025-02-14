import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { NavLinkProps } from '../../types'

export const NavLink = ({ href, children, isActive }: NavLinkProps) => (
    <Link
        as={NextLink}
        href={href}
        display="block"
        py={2}
        px={4}
        fontSize="md"
        fontWeight="medium"
        color="white"
        borderRadius="md"
        _hover={{
            bg: 'whiteAlpha.200',
            transform: 'translateX(4px)',
            transition: 'all 0.2s',
        }}
        bg={isActive ? 'whiteAlpha.200' : 'transparent'}
        transition="all 0.2s"
        textDecoration="none"
    >
        {children}
    </Link>
)
