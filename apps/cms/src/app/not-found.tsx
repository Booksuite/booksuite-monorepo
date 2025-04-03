import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { Logo } from '@/components/atoms/Logo'

export default function Custom404() {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            minHeight="100vh"
            bgcolor="blue.900"
            color="white"
            px={4}
        >
            <Box display="flex" justifyContent="center">
                <Logo.FullLogo />
            </Box>
            <Typography variant="h5" component="h1" color="white" mt={8} mb={8}>
                Página não encontrada
            </Typography>
            <Button component={Link} href="/" variant="contained">
                Voltar
            </Button>
        </Stack>
    )
}
