'use client' // Error boundaries must be Client Components

import { Button } from '@chakra-ui/react'

export default function Error({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div>
            <h2>Error! Algo deu errado, tente novamente!</h2>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Tentar novamente
            </Button>
        </div>
    )
}
