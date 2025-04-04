'use client'

import { Flex } from '@chakra-ui/react'
import { useState } from 'react'

import LabelBadge from '@/components/atoms/LabelBadge'
import { NumberInput } from '@/components/atoms/NumberInput'

import { PriceListItemProps } from './types'

export const PriceListItem: React.FC<PriceListItemProps> = (props) => {
    const [total, setTotal] = useState(
        props?.value ? props.value * props.unityValue : 0,
    )

    return (
        <Flex
            margin={'10px'}
            borderBottom="2px solid #e2e8f0"
            borderRadius="md"
        >
            <NumberInput
                marginLeft={'auto'}
                maxWidth={'30vw'}
                onChange={(inputValue) => {
                    setTotal(props.unityValue * parseFloat(inputValue))
                }}
                label={
                    <>
                        {props.title}
                        {props.unityValue && (
                            <LabelBadge>
                                <br />
                                R${props.unityValue} Un
                                <br />
                                Total: R${total}
                            </LabelBadge>
                        )}
                    </>
                }
                {...props}
            />
        </Flex>
    )
}
