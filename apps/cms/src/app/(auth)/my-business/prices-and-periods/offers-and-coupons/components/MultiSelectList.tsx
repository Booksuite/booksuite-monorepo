import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'

export interface MultiSelectListItem {
    id: string | number
    name: string
}

interface MultiSelectListProps {
    title: string
    items: MultiSelectListItem[]
    selected: (string | number)[]
    onChange: (selected: (string | number)[]) => void
    addButtonLabel?: string
}

export const MultiSelectList: React.FC<MultiSelectListProps> = ({
    title,
    items,
    selected,
    onChange,
    addButtonLabel = 'Adicionar',
}) => {
    const [open, setOpen] = useState(false)
    const [modalSelected, setModalSelected] = useState<(string | number)[]>([])

    const handleToggle = (id: string | number) => {
        if (selected.includes(id)) {
            onChange(selected.filter((s) => s !== id))
        } else {
            onChange([...selected, id])
        }
    }

    const handleOpenModal = () => {
        setModalSelected(selected)
        setOpen(true)
    }
    const handleCloseModal = () => setOpen(false)
    const handleModalToggle = (id: string | number) => {
        if (modalSelected.includes(id)) {
            setModalSelected(modalSelected.filter((s) => s !== id))
        } else {
            setModalSelected([...modalSelected, id])
        }
    }
    const handleModalSelectAll = (checked: boolean) => {
        if (checked) {
            setModalSelected(items.map((item) => item.id))
        } else {
            setModalSelected([])
        }
    }
    const handleModalConfirm = () => {
        onChange(modalSelected)
        setOpen(false)
    }

    return (
        <Paper
            sx={{
                p: 4,
                borderRadius: 2,
                boxShadow: 0,
                border: '1px solid #E0E0E0',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <Grid container alignItems="center" justifyContent="space-between">
                <div>
                    <Typography variant="h6" fontWeight={500}>
                        {title}
                    </Typography>
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenModal}
                        sx={{
                            borderRadius: 1,
                            fontWeight: 600,
                            fontSize: 14,
                        }}
                    >
                        {addButtonLabel}
                    </Button>
                </div>
            </Grid>
            <FormControl component="fieldset" fullWidth>
                <Stack spacing={2} sx={{ maxHeight: 320, overflowY: 'auto' }}>
                    {items.filter((item) => selected.includes(item.id))
                        .length === 0 ? (
                        <Box
                            sx={{
                                textAlign: 'center',
                                py: 4,
                                px: 2,
                                color: 'text.secondary',
                                background: '#F9FBFC',
                                borderRadius: 1,
                            }}
                        >
                            Nenhum item selecionado
                        </Box>
                    ) : (
                        items
                            .filter((item) => selected.includes(item.id))
                            .map((item) => (
                                <FormControlLabel
                                    key={item.id}
                                    control={
                                        <Checkbox
                                            checked={selected.includes(item.id)}
                                            onChange={() =>
                                                handleToggle(item.id)
                                            }
                                        />
                                    }
                                    label={item.name}
                                    sx={{
                                        width: '100%',
                                        background: '#F5F8FA',
                                        borderRadius: 1,
                                        px: 2,
                                        py: 1,
                                    }}
                                />
                            ))
                    )}
                </Stack>
            </FormControl>

            <Dialog
                open={open}
                onClose={handleCloseModal}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h6" fontSize={18} fontWeight={500}>
                            {title}
                        </Typography>
                        <FormControlLabel
                            sx={{
                                marginRight: 0,
                            }}
                            control={
                                <Checkbox
                                    checked={
                                        modalSelected.length === items.length &&
                                        items.length > 0
                                    }
                                    onChange={(e) =>
                                        handleModalSelectAll(e.target.checked)
                                    }
                                />
                            }
                            label="Selecionar Todos"
                        />
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ maxHeight: 350, overflowY: 'auto', mt: 1 }}>
                        <Stack spacing={2} mt={1}>
                            {items.map((item) => (
                                <FormControlLabel
                                    key={item.id}
                                    control={
                                        <Checkbox
                                            checked={modalSelected.includes(
                                                item.id,
                                            )}
                                            onChange={() =>
                                                handleModalToggle(item.id)
                                            }
                                        />
                                    }
                                    label={item.name}
                                    sx={{
                                        width: '100%',
                                        background: '#F5F8FA',
                                        borderRadius: 1,
                                        px: 2,
                                        py: 1,
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ gap: 1 }}>
                    <Button
                        onClick={handleCloseModal}
                        variant="outlined"
                        color="secondary"
                        sx={{
                            borderRadius: 1,
                            fontWeight: 600,
                            fontSize: 16,
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleModalConfirm}
                        variant="contained"
                        sx={{
                            borderRadius: 1,
                            fontWeight: 600,
                            fontSize: 16,
                        }}
                    >
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}
