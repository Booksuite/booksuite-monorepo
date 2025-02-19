'use client'

import { Flex } from '@chakra-ui/react'
import { PageHeaderRootProps } from './types'

export function PageHeaderRoot(props: PageHeaderRootProps) {
    return (
        <Flex className="PageHeader" direction="column" gap={2}>
            {props.children}
        </Flex>
    )
}
