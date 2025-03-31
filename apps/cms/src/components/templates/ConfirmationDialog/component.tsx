import { Close as CloseIcon } from '@mui/icons-material'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from '@mui/material'

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

    const handleClose = () => {
        if (isCancelable) {
            closeDialog()
        }
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ color: `${variant}.main` }}>
                {title}
                {isCancelable && (
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2, gap: 1 }}>
                {cancelButton && (
                    <Button
                        color={variant}
                        {...cancelButton}
                        variant={cancelButton.variant || 'outlined'}
                        onClick={(e) => {
                            cancelButton.onClick?.(e)
                            handleClose()
                        }}
                    />
                )}
                {confirmButton && (
                    <Button
                        color={variant}
                        {...confirmButton}
                        variant={confirmButton.variant || 'contained'}
                        onClick={(e) => {
                            confirmButton.onClick?.(e)
                            handleClose()
                        }}
                    />
                )}
            </DialogActions>
        </Dialog>
    )
}
