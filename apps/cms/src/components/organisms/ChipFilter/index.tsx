'use client'

import { Box } from '@chakra-ui/react'

import { Chip } from '@/components/atoms/Chip'

import { ChipFilterProps } from './types'

export const ChipFilter: React.FC<ChipFilterProps> = ({
    items,
    multiple,
    value = [],
    onChange,
}) => {
    const toggleSelection = (key: string) => {
        if (multiple) {
            onChange(
                value.includes(key)
                    ? value.filter((item: string) => item !== key)
                    : [...value, key],
            )
        } else {
            onChange(value.includes(key) ? [] : [key])
        }
    }

    return (
        <Box display="flex" gap={2}>
            {items.map((item) => (
                <Chip
                    key={item.key}
                    label={item.label}
                    isSelected={value.includes(item.key)}
                    onClick={() => toggleSelection(item.key)}
                />
            ))}
        </Box>
    )
}
