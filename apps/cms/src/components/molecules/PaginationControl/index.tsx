'use client'

import {
    MenuItem,
    Pagination,
    PaginationProps,
    Select,
    Stack,
} from '@mui/material'

import { DEFAULT_ITEMS_PER_PAGE } from './constants'

interface PaginationControlsProps extends PaginationProps {
    itemsPerPage?: number
    itemsPerPageOptions?: number[]
    onItemsPerPageChange?: (itemsPerPage: number) => void
}

export function PaginationControls({
    itemsPerPageOptions = DEFAULT_ITEMS_PER_PAGE,
    itemsPerPage,
    onItemsPerPageChange,
    ...props
}: PaginationControlsProps) {
    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        onItemsPerPageChange?.(newItemsPerPage)
    }

    return (
        <Stack direction="row" gap={2}>
            {!!itemsPerPageOptions && (
                <Select
                    variant="outlined"
                    value={itemsPerPage}
                    onChange={(e) =>
                        handleItemsPerPageChange(Number(e.target.value))
                    }
                    sx={{
                        '& .MuiSelect-select': {
                            lineHeight: '32px',
                            py: 0,
                            height: '32px',
                        },
                    }}
                >
                    {itemsPerPageOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            )}

            <Pagination {...props} />
        </Stack>
    )
}
