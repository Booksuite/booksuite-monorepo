import { Box, Button, Heading } from '@chakra-ui/react'
import Link from 'next/link'

import { Logo } from '@/components/atoms/Logo'

export default function Custom404() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            minHeight="100vh"
            bg="primary.900"
            color="white"
            px={4}
        >
            <Box maxWidth="350px">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Logo.FullLogo />
                </div>
                <Heading as="h1" size="md" color={'white'} mt={4}>
                    Página não encontrada
                </Heading>
                <Button as={Link} href="/" mt={4}>
                    Voltar
                </Button>
            </Box>
        </Box>
    )
}
