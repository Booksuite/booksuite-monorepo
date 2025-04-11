import { Media } from '@booksuite/sdk'
import {
    closestCenter,
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    MenuItem,
    Switch,
    TextField,
} from '@mui/material'
import { useFormikContext } from 'formik'
import { useState } from 'react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { MediaGallery } from '@/components/organisms/MediaGallery'
import { BannerFormData } from '../utils/config'
import {
    ACTION_BUTTON_OPTIONS,
    BANNER_POSITION_OPTIONS,
} from '../utils/constants'

import { SortableBannerMediaItem } from './SortableBannerMediaItem'

export const BannerForm = () => {
    const { setFieldValue, values, touched, errors, getFieldProps } =
        useFormikContext<BannerFormData>()

    const [specificPeriods, setSpecificPeriods] = useState(false)

    const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false)

    const handleMediaChange = (selectedMedia: Media[]) => {
        const [media] = selectedMedia

        if (!media) return

        const formattedMedia = {
            order: 0,
            media,
        }

        setFieldValue('medias', [formattedMedia])
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
            <FormSection>
                <FormControlLabel
                    control={
                        <Switch
                            checked={values.published}
                            onChange={(e) =>
                                setFieldValue('published', e.target.checked)
                            }
                        />
                    }
                    label="Publicado"
                />
            </FormSection>
            <FormSection>
                <TextField
                    label="Nome de identificação (uso interno)"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    {...getFieldProps('name')}
                />

                <TextField
                    select
                    label="Posição do Banner"
                    value={values.position}
                    onChange={(e) => setFieldValue('position', e.target.value)}
                >
                    {BANNER_POSITION_OPTIONS.map(({ label, value }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </TextField>
            </FormSection>

            <FormSection title="Informações do banner">
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Título principal"
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                            fullWidth
                            {...getFieldProps('title')}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Descrição de apoio"
                            error={
                                touched.description &&
                                Boolean(errors.description)
                            }
                            helperText={
                                touched.description && errors.description
                            }
                            fullWidth
                            {...getFieldProps('description')}
                        />
                    </Grid>
                </Grid>

                <TextField
                    select
                    label="Botão de ação do banner"
                    value={values.action}
                    onChange={(e) => setFieldValue('action', e.target.value)}
                >
                    {ACTION_BUTTON_OPTIONS.map(({ label, value }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </TextField>

                {values.action !== 'NONE' && (
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField
                                label="Texto do Botão (CTA)"
                                error={
                                    touched.actionButtonText &&
                                    Boolean(errors.actionButtonText)
                                }
                                helperText={
                                    touched.actionButtonText &&
                                    errors.actionButtonText
                                }
                                fullWidth
                                {...getFieldProps('actionButtonText')}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                label="Link do Botão (URL)"
                                error={
                                    touched.actionButtonLink &&
                                    Boolean(errors.actionButtonLink)
                                }
                                helperText={
                                    touched.actionButtonLink &&
                                    errors.actionButtonLink
                                }
                                fullWidth
                                {...getFieldProps('actionButtonLink')}
                            />
                        </Grid>
                    </Grid>
                )}
            </FormSection>

            <FormSection
                title="Imagem do Banner"
                variant="outlined"
                rightAction={
                    <Button onClick={() => setIsMediaGalleryOpen(true)}>
                        Selecionar Mídia
                    </Button>
                }
            >
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                >
                    <SortableContext
                        items={values.medias.map((item) => item.media.id)}
                        strategy={rectSortingStrategy}
                    >
                        {values.medias.map((item) => (
                            <Box key={item.media.id} mt={5} mb={5}>
                                <SortableBannerMediaItem mediaItem={item} />
                            </Box>
                        ))}
                    </SortableContext>
                </DndContext>

                <MediaGallery
                    isOpen={isMediaGalleryOpen}
                    onClose={() => setIsMediaGalleryOpen(false)}
                    selectedItems={values.medias.map((item) => item.media.id)}
                    initialItems={values.medias.map((item) => item.media)}
                    onItemsChange={handleMediaChange}
                    maxItems={2}
                    minItems={1}
                />
            </FormSection>

            <FormSection>
                <FormControlLabel
                    control={
                        <Switch
                            checked={specificPeriods}
                            onChange={(e) =>
                                setSpecificPeriods(e.target.checked)
                            }
                        />
                    }
                    label="Período de exibição personalizado"
                />
            </FormSection>

            {specificPeriods === true && (
                <FormSection>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField
                                label="Início de exibição"
                                type="date"
                                fullWidth
                                value={values.startAt || ''}
                                onChange={(e) =>
                                    setFieldValue('startAt', e.target.value)
                                }
                                error={!!errors.startAt}
                                helperText={errors.startAt}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                label="Fim de exibição"
                                type="date"
                                fullWidth
                                value={values.endAt || ''}
                                onChange={(e) =>
                                    setFieldValue('endAt', e.target.value)
                                }
                                error={!!errors.endAt}
                                helperText={errors.endAt}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </FormSection>
            )}
        </FormContainer>
    )
}
