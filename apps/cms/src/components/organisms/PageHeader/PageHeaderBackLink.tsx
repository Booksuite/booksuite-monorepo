'use client'

import { Box, Link, LinkProps, Text } from '@chakra-ui/react'
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
            as={props.href ? NextLink : 'button'}
            variant="primary"
            display="flex"
            alignItems="center"
            fontSize="sm"
            fontWeight="medium"
            onClick={props.href ? undefined : back}
            {...props}
        >
            <Box mb={0.5}>
                <ChevronLeft size={18} />
            </Box>
            <Text>{props.children}</Text>
        </Link>
    )
}
