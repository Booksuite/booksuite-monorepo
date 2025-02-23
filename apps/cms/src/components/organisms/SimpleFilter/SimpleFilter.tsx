'use client'

import { Flex, RadioGroup } from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SimpleFilterItem } from './SimpleFilterItem'
import { SimpleFilterItemsType, SimpleFilterProps } from './types'

export function SimpleFilter({ ...props }: SimpleFilterProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const defaultValue = props.items.find((el) => el.checked)?.label || ''

    function handleChange(value: string) {
        const params = new URLSearchParams(searchParams)

        if (value) {
            params.set('filter', value)
        } else {
            params.delete('filter')
        }

        router.push(`${pathname}?${params.toString().toLowerCase()}`)
    }

    return (
        <RadioGroup onChange={handleChange} defaultValue={defaultValue}>
            <Flex direction="row" gap={2} overflowX="auto">
                {props.items.map(
                    (item: SimpleFilterItemsType, index: number) => (
                        <SimpleFilterItem
                            key={`${props.name} - ${index}`}
                            labelFor={item.label}
                            name={props.name}
                            value={item.label}
                        >
                            {item.label}
                        </SimpleFilterItem>
                    ),
                )}
            </Flex>
        </RadioGroup>
    )
}
