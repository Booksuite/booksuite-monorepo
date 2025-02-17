'use client'
import ChevronRightIcon from '@/components/svgs/icons/ChevronRightIcon'
import { Link, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import * as React from 'react'

export interface PageToolbarBackLinkProps extends LinkProps {
    children: React.ReactNode
    className?: string
}

export function PageToolbarBackLink(props: PageToolbarBackLinkProps) {
    return (
        <Link
            as={NextLink}
            variant="primary"
            {...props}
            className={`PageToolbarBackLink flex items-center text-[0.8125rem] font-medium ${props.className}`}
        >
            <ChevronRightIcon className="shrink-0 scale-[-1]" />
            {props.children}
        </Link>
    )
}
