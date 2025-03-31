import { create } from 'zustand'

import { OpenDialogParams } from './types'

export interface ConfirmationDialogState extends OpenDialogParams {
    isOpen: boolean
    openDialog: (params: OpenDialogParams) => void
    closeDialog: () => void
}

const initialState: Omit<
    ConfirmationDialogState,
    'openDialog' | 'closeDialog'
> = {
    isOpen: false,
    title: '',
    description: '',
    confirmButton: {},
    cancelButton: {},
}

export const useConfirmationDialogStore = create<ConfirmationDialogState>(
    (set) => ({
        ...initialState,

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
            set({ isOpen: false })
        },
    }),
)
