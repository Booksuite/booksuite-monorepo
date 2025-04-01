import CloseIcon from '@mui/icons-material/Close'
import LinkIcon from '@mui/icons-material/Link'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    IconButton,
    TextField,
} from '@mui/material'
import { useState } from 'react'

import { getErrorMessage } from '@/common/utils'
import { MediaUrlInfo } from '../../types'

import { validateUrlContent } from './utils'

interface AddUrlModalProps {
    allowVideos?: boolean
    onAddUrl: (info: MediaUrlInfo) => Promise<void> | void
    disabled?: boolean
}

export const AddUrlModal: React.FC<AddUrlModalProps> = ({
    allowVideos = true,
    onAddUrl,
    disabled,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [urlInput, setUrlInput] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isValidating, setIsValidating] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleAddUrl = async () => {
        try {
            setErrorMessage(null)
            setIsValidating(true)

            const info = await validateUrlContent(urlInput, allowVideos)
            handleClose()

            setIsSaving(true)
            await Promise.resolve(onAddUrl(info))
        } catch (error) {
            setErrorMessage(getErrorMessage(error))
        } finally {
            setIsValidating(false)
            setIsSaving(false)
        }
    }

    const handleClose = () => {
        setIsOpen(false)
        setUrlInput('')
        setErrorMessage(null)
    }

    return (
        <>
            <Button
                size="small"
                disabled={disabled || isSaving}
                startIcon={<LinkIcon />}
                variant="outlined"
                onClick={() => setIsOpen(true)}
                sx={{ mr: 2 }}
            >
                {isSaving ? 'Adicionando...' : 'Adicionar URL'}
            </Button>
            <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Adicionar mídia externa (URL)
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
                </DialogTitle>
                <DialogContent sx={{ px: 6, py: 2 }}>
                    <FormControl fullWidth error={!!errorMessage}>
                        <TextField
                            fullWidth
                            value={urlInput}
                            type="url"
                            onChange={(e) => {
                                setUrlInput(e.target.value)
                                if (errorMessage) setErrorMessage(null)
                            }}
                            label="URL"
                            placeholder="https://"
                            disabled={isValidating}
                            error={!!errorMessage}
                            margin="normal"
                        />
                        {errorMessage && (
                            <FormHelperText>{errorMessage}</FormHelperText>
                        )}
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ px: 6, pb: 6 }}>
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                        disabled={isValidating}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleAddUrl}
                        disabled={!urlInput.trim() || isValidating}
                        loading={isValidating}
                    >
                        {isValidating ? 'Verificando...' : 'Adicionar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
