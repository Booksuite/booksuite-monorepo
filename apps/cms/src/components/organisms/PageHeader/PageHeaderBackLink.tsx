import { Box, Link, LinkProps, Text } from '@chakra-ui/react'
import { ChevronLeft } from 'lucide-react'
import { Route } from 'next'
import NextLink from 'next/link'

interface PageHeaderBackLinkProps extends LinkProps {
    href?: Route
}

export const PageHeaderBackLink: React.FC<PageHeaderBackLinkProps> = (
    props,
) => {
    return (
        <Link
            as={NextLink}
            variant="primary"
            display="flex"
            alignItems="center"
            fontSize="sm"
            fontWeight="medium"
            {...props}
        >
            <Box mb={0.5}>
                <ChevronLeft size={18} />
            </Box>
            <Text>{props.children}</Text>
        </Link>
    )
}
