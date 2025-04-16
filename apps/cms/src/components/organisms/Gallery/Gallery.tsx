'use client'

import { useState } from 'react'
import { Box, Button, Grid, Snackbar, Alert } from '@mui/material'
import { ArrowDownward, Add } from '@mui/icons-material'

import { Gallery } from '.'
import { GalleryRootProps } from './types'

export function GalleryRoot(props: GalleryRootProps) {
    const [items, setItems] = useState(props.items ?? [])
    const [snackbar, setSnackbar] = useState<{
        open: boolean
        message: string
        severity: 'error' | 'success'
    }>({
        open: false,
        message: '',
        severity: 'error',
    })

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (file) {
            const maxSizeInBytes = 5 * 1024 * 1024
            if (file.size > maxSizeInBytes) {
                setSnackbar({
                    open: true,
                    message: 'O tamanho da imagem não pode exceder 5 MB.',
                    severity: 'error',
                })
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setItems((prev) => [...prev, result])
            }
            reader.readAsDataURL(file)
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }))
    }

    return (
        <Box sx={{ width: '100%' }}>
            {(!items || items.length === 0) && (
                <Box
                    onClick={() =>
                        document.getElementById('fileInput')?.click()
                    }
                    sx={{ cursor: 'pointer' }}
                />
            )}

            {items && items.length > 0 && (
                <>
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        {items.map((item: string, index) => (
                            <Grid
                                key={index}
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                            >
                                <Gallery.Item
                                    index={index}
                                    src={item}
                                    selected={index === 1}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<Add />}
                                fullWidth
                                sx={{ cursor: 'pointer' }}
                            >
                                Adicionar Foto
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </Button>
                        </Grid>
                        <Grid size={6}>
                            <Button
                                variant="outlined"
                                startIcon={<ArrowDownward />}
                                fullWidth
                            >
                                Ordenar
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
