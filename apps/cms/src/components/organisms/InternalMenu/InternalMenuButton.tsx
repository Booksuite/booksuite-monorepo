import { Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

import { InternalMenu } from '.'
import { InternalMenuButtonProps } from './types'

export function InternalMenuButton(props: InternalMenuButtonProps) {
    return (
        <Link className="InternalMenu__Button" as={NextLink} {...props}>
            <Flex alignItems="center" gap={2} justifyContent="space-between">
                <Flex alignItems="center" gap={2}>
                    {props.children}
                </Flex>
                <InternalMenu.After />
            </Flex>
        </Link>
    )
}
