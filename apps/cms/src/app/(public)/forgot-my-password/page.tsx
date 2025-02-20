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
        <Box
            className="ForgotMyPassword"
            textAlign="center"
            maxW="sm"
            mx="auto"
            p={4}
        >
            <Text mb={6}>
                Digite seu e-mail que enviaremos um link para a recuperação de
                sua senha.
            </Text>

            <form>
                <FormControl mb={2}>
                    <FormLabel>E-mail</FormLabel>
                    <Input type="email" />
                </FormControl>

                <Button width="full">Enviar</Button>
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
