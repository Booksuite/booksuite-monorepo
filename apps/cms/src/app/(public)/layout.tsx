import { Box, Stack } from '@mui/material'
import { ReactNode } from 'react'

import { Logo } from '@/components/atoms/Logo'

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="blue.900"
            color="white"
            px={4}
        >
            <Box>

                <Box mt={10}>{children}</Box>
            </Box>
        </Stack>
    )
}
