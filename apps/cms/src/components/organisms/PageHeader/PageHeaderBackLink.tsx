'use client'

import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'

import ChevronRightIcon from '@/components/svgs/icons/ChevronRightIcon'
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
            <ChevronRightIcon
                style={{ flexShrink: 0, transform: 'scaleX(-1)' }}
            />
            {props.children}
        </Link>
    )
}
