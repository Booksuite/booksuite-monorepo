'use client'

import { Link, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import * as React from 'react'

import ChevronRightIcon from '@/components/svgs/icons/ChevronRightIcon'

export interface PageHeaderBackLinkProps extends LinkProps {
    children: React.ReactNode
    className?: string
}

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
