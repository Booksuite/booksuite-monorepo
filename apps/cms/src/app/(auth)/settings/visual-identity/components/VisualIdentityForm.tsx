'use client'

import { Media } from '@booksuite/sdk'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { useState } from 'react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { Image } from '@/components/atoms/Image'
import { MediaGallery } from '@/components/organisms/MediaGallery'
import { VisualIdentityFormData } from '../utils/config'

export default function VisualIdentityForm() {
    const { values, setFieldValue } = useFormikContext<VisualIdentityFormData>()

    const [isLogoMediaGalleryOpen, setIsLogoMediaGalleryOpen] = useState(false)
    const [isFavIconMediaGalleryOpen, setIsFavIconMediaGalleryOpen] =
        useState(false)

    const handleFavIconMediaChange = (selectedMedia: Media[]) => {
        const [media] = selectedMedia

        if (!media) return

        setFieldValue('favIcon', media.url)
        setFieldValue('favIconMedia', media)

        setIsFavIconMediaGalleryOpen(false)
    }

    const handleLogoMediaChange = (selectedMedia: Media[]) => {
        const [media] = selectedMedia

        if (!media) return

        setFieldValue('logo', media.url)
        setFieldValue('logoMedia', media)

        setIsLogoMediaGalleryOpen(false)
    }

    return (
        <FormContainer>
            <FormSection
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    p: 3,
                    borderRadius: 1,
                }}
            >
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Adicionar seu logotipo
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Arquivo deve ser em PNG com tamanho mínimo de 200px
                        </Typography>
                    </Box>
                    <Button
                        onClick={() => {
                            setIsLogoMediaGalleryOpen(true)
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Adicionar
                    </Button>
                </Grid>

                <MediaGallery
                    isOpen={isLogoMediaGalleryOpen}
                    onClose={() => setIsLogoMediaGalleryOpen(false)}
                    selectedItems={
                        values.logoMedia ? [values.logoMedia.id] : []
                    }
                    initialItems={values.logoMedia ? [values.logoMedia] : []}
                    onItemsChange={handleLogoMediaChange}
                    maxItems={1}
                    minItems={1}
                />

                <Box
                    sx={{
                        borderRadius: 1,
                        p: 3,
                        bgcolor: 'grey.100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 120,
                    }}
                >
                    {values.logo ? (
                        <Image
                            src={values.logo}
                            alt="Logotipo"
                            width={120}
                            height={120}
                            sx={{
                                width: 120,
                                height: 120,
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <Typography color="text.disabled">
                            Nenhuma imagem selecionada
                        </Typography>
                    )}
                </Box>
            </FormSection>

            <FormSection
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    p: 3,
                    borderRadius: 1,
                }}
            >
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Adicionar seu favicon
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Arquivo deve ser em ICO com tamanho mínimo de 32px
                        </Typography>
                    </Box>
                    <Button
                        onClick={() => {
                            setIsFavIconMediaGalleryOpen(true)
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Adicionar
                    </Button>
                </Grid>

                <MediaGallery
                    isOpen={isFavIconMediaGalleryOpen}
                    onClose={() => setIsFavIconMediaGalleryOpen(false)}
                    selectedItems={
                        values.favIconMedia ? [values.favIconMedia.id] : []
                    }
                    initialItems={
                        values.favIconMedia ? [values.favIconMedia] : []
                    }
                    onItemsChange={handleFavIconMediaChange}
                    maxItems={1}
                    minItems={1}
                />
                <Box
                    sx={{
                        borderRadius: 1,
                        p: 3,
                        bgcolor: 'grey.100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 70,
                    }}
                >
                    {values.favIcon ? (
                        <Box
                            component="img"
                            src={values.favIcon}
                            alt="Favicon"
                            sx={{
                                width: 70,
                                height: 70,
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <Typography color="text.disabled">
                            Nenhuma imagem selecionada
                        </Typography>
                    )}
                </Box>
            </FormSection>

            <FormSection title="Cor principal do site">
                <Grid container alignItems="center" spacing={2} p={1}>
                    <Grid size={11}>
                        <TextField
                            placeholder="#"
                            label="Cor principal (HEX)"
                            value={values.settings?.theme?.color || ''}
                            fullWidth
                            onChange={(e) => {
                                const formatted = e.target.value.startsWith('#')
                                    ? e.target.value
                                    : `#${e.target.value}`

                                setFieldValue('settings.theme.color', formatted)
                            }}
                        />
                    </Grid>
                    <Grid size={1}>
                        <Box
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                bgcolor:
                                    values.settings?.theme?.color || '#ffffff',
                                borderRadius: 1,
                                width: '100%',
                                height: 60,
                                ml: 1,
                            }}
                        />
                    </Grid>
                </Grid>
            </FormSection>
        </FormContainer>
    )
}
