import { Button as ChakraButton,ButtonProps } from '@chakra-ui/react'
import { Route } from 'next'
import Link from 'next/link'

interface LinkButtonProps extends ButtonProps {
    href: Route
}

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
    return (
        <ChakraButton
            as={Link}
            variant="solid"
            colorScheme="primary"
            {...props}
        >
            Adicionar
        </ChakraButton>
    )
}
