import { isOpenDialogParams, openDialog } from './helpers'
import { OpenDialogParams } from './types'

interface UseConfirmationDialogProps extends OpenDialogParams {}

/**
 * A hook that provides a simplified way to use the confirmation dialog
 */
export const useConfirmationDialog = (
    props?: Partial<UseConfirmationDialogProps>,
) => {
    const showDialog = (options: Partial<OpenDialogParams>) => {
        const mergedOptions = {
            ...props,
            ...options,
        }
        if (!isOpenDialogParams(mergedOptions)) {
            throw new Error('title, description and confirmButton are required')
        }

        openDialog(mergedOptions)
    }

    return {
        showDialog,
    }
}
