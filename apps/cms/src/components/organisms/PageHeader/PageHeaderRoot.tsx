'use client'

import { Flex } from '@chakra-ui/react'
import { PageHeaderRootProps } from './types'

export const PageHeaderRoot: React.FC<PageHeaderRootProps> = (props) => {
    return (
        <Flex direction="column" gap={2} {...props}>
            {props.children}
        </Flex>
    )
}
