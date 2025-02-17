'use client'
import { Flex } from '@chakra-ui/react'
import * as React from 'react'

export interface PageToolbarRootProps {
    children: React.ReactNode
}

export function PageToolbarRoot(props: PageToolbarRootProps) {
    return (
        <Flex className="PageToolbar" direction="column" gap={2}>
            {props.children}
        </Flex>
    )
}
