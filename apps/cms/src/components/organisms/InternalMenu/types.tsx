import { LinkProps } from '@chakra-ui/react'

export interface InternalMenuRootProps
    extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode
    target?: string
}

export interface InternalMenuButtonProps extends LinkProps {
    children: React.ReactNode
}
