'use client'

import { Chip } from '@/components/atoms/Chip'
import { Box } from '@chakra-ui/react'
import { selectedItems, toggleSelection } from './utils'

interface ChipFilterProps {
    items: { key: string; label: string }[]
}

export const ChipFilter: React.FC<ChipFilterProps> = ({ items }) => {
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
