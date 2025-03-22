import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react'
import { useCallback, useRef } from 'react'

import { useConfirmationDialogStore } from './store'

export const ConfirmationDialog = () => {
    const {
        isOpen,
        title,
        description,
        confirmButton,
        cancelButton,
        isCancelable,
        variant,
        closeDialog,
    } = useConfirmationDialogStore()

    const cancelRef = useRef<HTMLButtonElement>(null)

    const getVariantColor = useCallback(() => {
        switch (variant) {
            case 'error':
                return 'red'
            case 'warning':
                return 'orange'
            case 'success':
                return 'green'
            case 'info':
            default:
                return 'blue'
        }
    }, [variant])

    const handleClose = () => {
        closeDialog()
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={isCancelable ? handleClose : () => {}}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    {isCancelable && <AlertDialogCloseButton />}
                    <AlertDialogHeader color={`${getVariantColor()}.500`}>
                        {title}
                    </AlertDialogHeader>

                    <AlertDialogBody>{description}</AlertDialogBody>

                    <AlertDialogFooter gap={3}>
                        {cancelButton && (
                            <Button
                                ref={cancelRef}
                                variant={cancelButton.variant || 'outline'}
                                onClick={() => {
                                    cancelButton.onClick()
                                    handleClose()
                                }}
                            >
                                {cancelButton.text}
                            </Button>
                        )}
                        {confirmButton && (
                            <Button
                                colorScheme={getVariantColor()}
                                variant={confirmButton.variant || 'solid'}
                                onClick={() => {
                                    confirmButton.onClick()
                                    handleClose()
                                }}
                                ml={3}
                            >
                                {confirmButton.text}
                            </Button>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}
