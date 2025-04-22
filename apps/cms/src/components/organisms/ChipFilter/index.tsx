'use client'

import { Box, Chip, useTheme } from '@mui/material'

import { ChipFilterProps } from './types'

export const ChipFilter: React.FC<ChipFilterProps> = ({
    items,
    multiple,
    value = [],
    onChange,
}) => {
    const theme = useTheme()

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
        <Box display="flex" gap={1}>
            {items.map((item) => {
                const isSelected = value.includes(item.key)

                return (
                    <Chip
                        key={item.key}
                        label={item.label}
                        variant={isSelected ? 'filled' : 'outlined'}
                        sx={{
                            backgroundColor: isSelected
                                ? '#E6F6FF'
                                : 'transparent',
                            color: '#002159',
                            borderColor: theme.palette.grey[300],
                        }}
                        onClick={() => toggleSelection(item.key)}
                    />
                )
            })}
        </Box>
    )
}
