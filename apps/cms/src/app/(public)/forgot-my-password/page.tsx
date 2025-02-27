import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'

export default function ForgotMyPassword() {
    return (
        <Box textAlign="center" maxW="sm" mx="auto">
            <Text mb={6} fontWeight="semibold" fontSize={16}>
                Digite seu e-mail que enviaremos um link para a recuperação de
                sua senha.
            </Text>

            <form>
                <FormControl mb={3}>
                    <FormLabel>E-mail</FormLabel>
                    <Input type="email" />
                </FormControl>

                <Button width="full" mb={10}>
                    Enviar
                </Button>
            </form>

            <Link
                as={NextLink}
                href="/login"
                display="block"
                color="blue.500"
                fontWeight="semibold"
                fontSize={18}
            >
                Voltar
            </Link>
        </Box>
    )
}
