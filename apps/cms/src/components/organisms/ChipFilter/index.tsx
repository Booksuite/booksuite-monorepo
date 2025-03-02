'use client'

import { Box } from '@chakra-ui/react'
import { useState } from 'react'

import { Chip } from '@/components/atoms/Chip'

import { ChipFilterProps } from './types'

export const ChipFilter: React.FC<ChipFilterProps> = ({ items }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const toggleSelection = (key: string) => {
        setSelectedItems((prev) =>
            prev.includes(key)
                ? prev.filter((item) => item !== key)
                : [...prev, key],
        )
    }
    return (
        <Box display="flex" gap={2}>
            {items.map((item) => (
                <Chip
                    key={item.key}
                    label={item.label}
                    isSelected={selectedItems.includes(item.key)}
                    onClick={() => toggleSelection(item.key)}
                />
            ))}
        </Box>
    )
}
