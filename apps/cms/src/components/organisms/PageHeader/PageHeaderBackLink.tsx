'use client'

import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'

import ChevronRightIcon from '@/components/svgs/icons/ChevronRightIcon'
import { PageHeaderBackLinkProps } from './types'

export function PageHeaderBackLink(props: PageHeaderBackLinkProps) {
    return (
        <Link
            as={NextLink}
            variant="primary"
            {...props}
            className={`BackLink flex items-center text-[0.8125rem] font-medium ${props.className}`}
        >
            <ChevronRightIcon className="shrink-0 scale-[-1]" />
            {props.children}
        </Link>
    )
}
