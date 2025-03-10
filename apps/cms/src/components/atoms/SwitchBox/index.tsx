'use client'

import { Flex, FormLabel, Switch } from '@chakra-ui/react'

import { SwitchBoxProps } from './types'

export function SwitchBox({ flexProps, ...props }: SwitchBoxProps) {
    return (
        <Flex alignItems="center" gap={2} {...flexProps}>
            {props.label && (
                <FormLabel htmlFor={props.id} m="0" width={'full'}>
                    {props.label}
                </FormLabel>
            )}
            <Switch {...props} />
        </Flex>
    )
}
