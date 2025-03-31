import { useConfirmationDialogStore } from './store'
import { OpenDialogParams } from './types'

export function isOpenDialogParams(
    params: unknown,
): params is OpenDialogParams {
    return (
        typeof params === 'object' &&
        params !== null &&
        'title' in params &&
        'description' in params &&
        'confirmButton' in params
    )
}

export const openDialog = (params: OpenDialogParams) => {
    const { openDialog } = useConfirmationDialogStore.getState()
    openDialog(params)
}

export const closeDialog = () => {
    const { closeDialog } = useConfirmationDialogStore.getState()
    closeDialog()
}
