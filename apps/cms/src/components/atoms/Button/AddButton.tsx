import { Button, ButtonProps } from '@chakra-ui/react'

import PlusIcon from '@/components/svgs/icons/PlusIcon'

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
