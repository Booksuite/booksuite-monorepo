import {
    ConfirmationDialogVariant,
    DialogButton,
    useConfirmationDialogStore,
} from './store'

interface OpenDialogParams {
    title: string
    description: string
    confirmButton?: DialogButton
    cancelButton?: DialogButton
    isCancelable?: boolean
    variant?: ConfirmationDialogVariant
}

export const openDialog = (params: OpenDialogParams) => {
    const { openDialog } = useConfirmationDialogStore.getState()
    openDialog(params)
}

export const closeDialog = () => {
    const { closeDialog } = useConfirmationDialogStore.getState()
    closeDialog()
}
