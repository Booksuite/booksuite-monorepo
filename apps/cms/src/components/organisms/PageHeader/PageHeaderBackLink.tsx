'use client'

import { Link } from '@chakra-ui/react'
import { ChevronLeft } from 'lucide-react'
import NextLink from 'next/link'

import { PageHeaderBackLinkProps } from './types'

export const PageHeaderBackLink: React.FC<PageHeaderBackLinkProps> = (
    props,
) => {
    return (
        <Link
            as={NextLink}
            href="#"
            variant="primary"
            display="flex"
            alignItems="center"
            fontSize="0.8rem"
            fontWeight="medium"
            {...props}
        >
            <ChevronLeft style={{ flexShrink: 0 }} />
            {props.children}
        </Link>
    )
}
