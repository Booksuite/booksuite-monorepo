import { Box, Flex } from '@chakra-ui/react'

import Logo from '@/components/svgs/Logo'
import { ReactNode } from 'react'

export default function PublicLayout(children: ReactNode) {
    return (
        <Flex
            direction="column"
            justify="center"
            align="center"
            textAlign="center"
            minH="100vh"
            bg="var(--clr-primary)"
            color="white"
        >
            <Box maxW="350px" w="full">
                <Box display="flex" justifyContent="center">
                    <Logo />
                </Box>

                <Box mt={10}>{children}</Box>
            </Box>
        </Flex>
    )
}
