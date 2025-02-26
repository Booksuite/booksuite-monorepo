import { Logo } from '@/components/atoms/Logo'
import { Box, Button, Heading } from '@chakra-ui/react'
import Link from 'next/link'

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
                <Logo
                    style={{
                        marginInline: 'auto',
                        marginLeft: '65px',
                    }}
                />
                <Heading as="h1" size="md" color={'white'}>
                    Página não encontrada
                </Heading>
                <Button as={Link} href="/" mt={6}>
                    Voltar
                </Button>
            </Box>
        </Box>
    )
}
