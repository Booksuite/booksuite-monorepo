import PlusIcon from '@/src/components/svgs/icons/PlusIcon'
import { Button, ButtonProps } from '@chakra-ui/react'

export function AddButton({ ...props }: ButtonProps) {
    return (
        <Button
            variant="outline"
            colorScheme="outline"
            leftIcon={<PlusIcon />}
            {...props}
            className={`w-full ${props.className}`}
        >
            Adicionar
        </Button>
    )
}
