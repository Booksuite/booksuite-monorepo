'use client'
import { Button, IconButton, Stack } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationControlsProps {
    page: number
    prevPage: number | null
    nextPage: number | null
    totalPages: number
    totalItems: number
    onPageChange: (page: number) => void
}

export function PaginationControls({
    page,
    prevPage,
    nextPage,
    totalPages,
    totalItems,
    onPageChange,
}: PaginationControlsProps) {
    const handlePageChange = (newPage: number) => {
        onPageChange(newPage)
    }

    return (
        <Stack p={2} justifyContent={'center'} direction="row" spacing={2}>
            <IconButton
                variant="ghost"
                aria-label="Previous"
                onClick={() => prevPage && handlePageChange(prevPage)}
                disabled={!prevPage}
            >
                <ChevronLeft />
            </IconButton>

            {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                    colorScheme="purple"
                    key={index}
                    variant={index + 1 === page ? undefined : 'ghost'}
                >
                    {index + 1}
                </Button>
            ))}

            <IconButton
                variant="ghost"
                aria-label="Previous"
                onClick={() => nextPage && handlePageChange(nextPage)}
                disabled={!nextPage}
            >
                <ChevronRight />
            </IconButton>
        </Stack>
    )
}
