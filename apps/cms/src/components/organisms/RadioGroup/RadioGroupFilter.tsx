'use client'

import { useRadioGroup } from '@/hooks/RadioGroup/useRadioGroup'
import { Flex } from '@chakra-ui/react'
import { RadioGroupItem } from './RadioGroupItem'
import { RadioGroupItemsType, RadioGroupProps } from './types'

export const RadioGroupFilter: React.FC<RadioGroupProps> = ({ ...props }) => {
    const { selectedValues, handleChange } = useRadioGroup(
        props.items,
        props.onChange,
    )

    return (
        <Flex direction="row" gap={2} overflowX="auto">
            {props.items.map((item: RadioGroupItemsType, index: number) => (
                <RadioGroupItem
                    key={`${props.name} - ${index}`}
                    labelFor={item.label}
                    name={props.name}
                    value={item.label}
                    isChecked={selectedValues.includes(item.label)}
                    onChange={() => handleChange(item.label)}
                >
                    {item.label}
                </RadioGroupItem>
            ))}
        </Flex>
    )
}
