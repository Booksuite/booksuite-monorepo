import { Flex } from '@chakra-ui/react'

import { InternalMenuRootProps } from './types'

export function InternalMenuRoot({
    children,
    ...props
}: InternalMenuRootProps) {
    return (
        <nav className={`InternalMenu ${props.className}`}>
            <Flex direction="column" gap={2}>
                {children}
            </Flex>
        </nav>
    )
}
