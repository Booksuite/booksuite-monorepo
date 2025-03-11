import { Link, LinkProps } from '@chakra-ui/react'
import { ChevronLeft } from 'lucide-react'
import NextLink from 'next/link'
import { PropsWithChildren } from 'react'

export const PageHeaderBackLink: React.FC<PropsWithChildren<LinkProps>> = (
    props,
) => {
    return (
        <Link
            {...props}
            as={NextLink}
            variant="primary"
            display="flex"
            alignItems="center"
            fontSize="0.8rem"
            fontWeight="medium"
        >
            <ChevronLeft style={{ flexShrink: 0 }} />
            {props.children}
        </Link>
    )
}
