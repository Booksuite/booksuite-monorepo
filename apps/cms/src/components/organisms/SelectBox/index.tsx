'use client'

import { Button, useDisclosure } from '@chakra-ui/react'

import { SelectBoxModal } from './SelectBoxModal'
import { SelectBoxProps } from './types'

export const SelectBox = <T extends { name: string; id: string }>({
    openModalButtonText = 'Selecionar',
    ...props
}: SelectBoxProps<T>) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} variant="solid" colorScheme="blue">
                {openModalButtonText}
            </Button>

            <SelectBoxModal<T> isOpen={isOpen} onClose={onClose} {...props} />
        </>
    )
}
