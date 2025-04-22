'use client'

import { Media } from '@booksuite/sdk'
import {
    closestCenter,
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { MediaGallery } from '@/components/organisms/MediaGallery'
import { SortableMediaItems } from '@/components/templates/SortableMediaItem'
import { visualIdentityFormData } from '../utils/config'

export default function VisualIdentityForm() {
    const { values, setFieldValue } = useFormikContext<visualIdentityFormData>()

    const [selectingLogoOrIcon, setSelectingLogoOrIcon] =
        useState<boolean>(false)
    const [logo, setLogo] = useState<string | null>(null)
    const [favicon, setFavicon] = useState<string | null>(null)
    const [mainColor, setMainColor] = useState(
        `${values.settings.theme?.color}`,
    )

    const logoInputRef = useRef<HTMLInputElement>(null)
    const faviconInputRef = useRef<HTMLInputElement>(null)

    const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setLogo(imageUrl)
            setFieldValue('logoFile', file)
        }
    }

    const handleFaviconChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setFavicon(imageUrl)
            setFieldValue('favIconFile', file)
        }
    }

    useEffect(() => {
        setLogo(values.logo)
        setFavicon(values.favIcon)
    }, [values.favIcon, values.logo])

    const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false)

    const handleMediaChange = (selectedMedia: Media[]) => {
        const [media] = selectedMedia

        if (!media) return

        if (selectingLogoOrIcon) {
            setFieldValue('logo', media.url)
            setLogo(media.url)
        } else {
            setFieldValue('favIcon', media.url)
            setFavicon(media.url)
        }

        setIsMediaGalleryOpen(false)
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    )

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
                            setSelectingLogoOrIcon(true)
                            setIsMediaGalleryOpen(true)
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Adicionar
                    </Button>
                </Grid>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                >
                    <SortableContext
                        items={values.medias.map((item) => item.id)}
                        strategy={rectSortingStrategy}
                    >
                        {values.medias.map((item) => (
                            <Box key={item.id} mt={5} mb={5}>
                                <SortableMediaItems mediaItem={item} />
                            </Box>
                        ))}
                    </SortableContext>
                </DndContext>

                <MediaGallery
                    isOpen={isMediaGalleryOpen}
                    onClose={() => setIsMediaGalleryOpen(false)}
                    selectedItems={values.medias.map((item) => item.id)}
                    initialItems={values.medias.map((item) => item)}
                    onItemsChange={handleMediaChange}
                    maxItems={2}
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
                    {logo ? (
                        <Box
                            component="img"
                            src={logo}
                            alt="Logotipo"
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

                <input
                    type="file"
                    ref={logoInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
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
                            setSelectingLogoOrIcon(false)
                            setIsMediaGalleryOpen(true)
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Adicionar
                    </Button>
                </Grid>
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
                    {favicon ? (
                        <Box
                            component="img"
                            src={favicon}
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

                <input
                    type="file"
                    ref={faviconInputRef}
                    onChange={handleFaviconChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
            </FormSection>

            <FormSection title="Cor principal do site">
                <Grid container alignItems="center" spacing={2} p={1}>
                    <Grid size={11}>
                        <TextField
                            placeholder="#"
                            label="Cor principal (HEX)"
                            value={values.settings.theme?.color}
                            fullWidth
                            onChange={(e) => {
                                const formatted = e.target.value.includes('#')
                                    ? e.target.value
                                    : `#${e.target.value}`

                                setFieldValue('settings.theme.color', formatted)
                                setMainColor(formatted)
                            }}
                        />
                    </Grid>
                    <Grid size={1}>
                        <Box
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                bgcolor: mainColor,
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
