import { ButtonProps } from '@chakra-ui/react'
import { create } from 'zustand'

export type ConfirmationDialogVariant = ButtonProps['variant']

export interface DialogButton extends ButtonProps {
    text: string
    variant?: string
    onClick: () => void
}

export interface ConfirmationDialogState {
    isOpen: boolean
    title: string
    description: string
    confirmButton?: DialogButton
    cancelButton?: DialogButton
    isCancelable: boolean
    variant: ConfirmationDialogVariant

    openDialog: (params: {
        title: string
        description: string
        confirmButton?: DialogButton
        cancelButton?: DialogButton
        isCancelable?: boolean
        variant?: ConfirmationDialogVariant
    }) => void
    closeDialog: () => void
}

export const useConfirmationDialogStore = create<ConfirmationDialogState>(
    (set) => ({
        isOpen: false,
        title: '',
        description: '',
        confirmButton: undefined,
        cancelButton: undefined,
        isCancelable: true,
        variant: 'info',

        openDialog: ({
            title,
            description,
            confirmButton,
            cancelButton,
            isCancelable = true,
            variant = 'info',
        }) => {
            set({
                isOpen: true,
                title,
                description,
                confirmButton,
                cancelButton,
                isCancelable,
                variant,
            })
        },

        closeDialog: () => {
            set({
                isOpen: false,
                title: '',
                description: '',
                confirmButton: undefined,
                cancelButton: undefined,
                isCancelable: true,
                variant: 'info',
            })
        },
    }),
)
