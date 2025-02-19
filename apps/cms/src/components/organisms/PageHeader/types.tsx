import { LinkProps } from '@chakra-ui/react'

export interface PageHeaderBackLinkProps extends LinkProps {
    children: React.ReactNode
    className?: string
}

export interface PageHeaderRootProps {
    children: React.ReactNode
}

export interface PageHeaderTitleProps {
    children: React.ReactNode
}
