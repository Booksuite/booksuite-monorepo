'use client'

import { Box, Link, LinkProps, Typography } from '@mui/material'
import { ChevronLeft } from 'lucide-react'
import { Route } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'

interface PageHeaderBackLinkProps extends LinkProps {
    href?: Route
}

export const PageHeaderBackLink: React.FC<PageHeaderBackLinkProps> = (
    props,
) => {
    const { back } = useRouter()

    return (
        <Link
            component={props.href ? NextLink : 'button'}
            display="flex"
            flexGrow={0}
            alignItems="center"
            onClick={props.href ? undefined : back}
            maxWidth="fit-content"
            {...props}
        >
            <Box>
                <ChevronLeft size={18} />
            </Box>
            <Typography variant="body2" fontWeight="medium" fontSize={14}>
                {props.children}
            </Typography>
        </Link>
    )
}
