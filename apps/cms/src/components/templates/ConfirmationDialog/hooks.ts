import { openDialog } from './helpers'
import { ConfirmationDialogVariant } from './store'

interface UseConfirmationDialogProps {
    title?: string
    description?: string
    variant?: ConfirmationDialogVariant
    confirmButtonText?: string
    cancelButtonText?: string
    isCancelable?: boolean
}

/**
 * A hook that provides a simplified way to use the confirmation dialog
 */
export const useConfirmationDialog = ({
    title = 'Confirmação',
    description = 'Tem certeza que deseja realizar esta ação?',
    variant = 'info',
    confirmButtonText = 'Confirmar',
    cancelButtonText = 'Cancelar',
    isCancelable = true,
}: UseConfirmationDialogProps = {}) => {
    const showDialog = (options: {
        onConfirm: () => void
        onCancel?: () => void
        title?: string
        description?: string
        variant?: ConfirmationDialogVariant
        confirmButtonText?: string
        cancelButtonText?: string
        isCancelable?: boolean
    }) => {
        const {
            onConfirm,
            onCancel = () => {},
            title: customTitle = title,
            description: customDescription = description,
            variant: customVariant = variant,
            confirmButtonText: customConfirmButtonText = confirmButtonText,
            cancelButtonText: customCancelButtonText = cancelButtonText,
            isCancelable: customIsCancelable = isCancelable,
        } = options

        openDialog({
            title: customTitle,
            description: customDescription,
            variant: customVariant,
            confirmButton: {
                text: customConfirmButtonText,
                onClick: onConfirm,
            },
            cancelButton: {
                text: customCancelButtonText,
                onClick: onCancel,
            },
            isCancelable: customIsCancelable,
        })
    }

    return {
        showDialog,
    }
}
