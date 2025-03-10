import { Button, ButtonProps } from '@chakra-ui/react'
import { CirclePlus } from 'lucide-react'

export function AddButton({ ...props }: ButtonProps) {
    return (
        <Button
            variant="outline"
            colorScheme="outline"
            leftIcon={<CirclePlus />}
            {...props}
            className={`w-full ${props.className}`}
        >
            Adicionar
        </Button>
    )
}
