'use client'
import { Button, IconButton, Select, Stack } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { DEFAULT_ITEMS_PER_PAGE } from './constants'

interface PaginationControlsProps {
    page: number
    prevPage: number | null
    nextPage: number | null
    totalPages: number
    totalItems: number
    itemsPerPage?: number
    itemsPerPageOptions?: number[]
    onPageChange: (page: number) => void
    onItemsPerPageChange?: (itemsPerPage: number) => void
}

export function PaginationControls({
    page,
    prevPage,
    nextPage,
    totalPages,
    totalItems,
    itemsPerPage,
    itemsPerPageOptions = DEFAULT_ITEMS_PER_PAGE,
    onPageChange,
    onItemsPerPageChange,
}: PaginationControlsProps) {
    const handlePageChange = (newPage: number) => {
        onPageChange(newPage)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        onItemsPerPageChange?.(newItemsPerPage)
    }

    return (
        <Stack direction="row" gap={2}>
            {!!itemsPerPage && (
                <Select
                    size="sm"
                    variant="outline"
                    w="auto"
                    value={itemsPerPage}
                    onChange={(e) =>
                        handleItemsPerPageChange(Number(e.target.value))
                    }
                >
                    {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Select>
            )}
            <IconButton
                variant="outline"
                aria-label="Previous"
                onClick={() => prevPage && handlePageChange(prevPage)}
                disabled={!prevPage}
            >
                <ChevronLeft />
            </IconButton>

            {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1
                const isActive = pageNumber === page
                return (
                    <Button
                        colorScheme="blue"
                        bg={isActive ? 'primary.900' : 'white'}
                        key={index}
                        variant={isActive ? 'solid' : 'outline'}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </Button>
                )
            })}

            <IconButton
                variant="outline"
                aria-label="Previous"
                onClick={() => nextPage && handlePageChange(nextPage)}
                disabled={!nextPage}
            >
                <ChevronRight />
            </IconButton>
        </Stack>
    )
}
