import { ButtonProps } from '@mui/material'

export type ConfirmationDialogVariant = 'error' | 'warning' | 'success' | 'info'

export interface DialogButton extends ButtonProps {}

export interface OpenDialogParams {
    title: string
    description: string
    confirmButton: DialogButton
    cancelButton?: DialogButton
    isCancelable?: boolean
    variant?: ConfirmationDialogVariant
}
