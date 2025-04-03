'use client'

import { Media, ServiceMedia, useSearchHousingUnitTypes } from '@booksuite/sdk'
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Stack,
    Switch,
    Typography,
    TextField,
} from '@mui/material'
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable'
import { useFormikContext } from 'formik'
import type React from 'react'
import { useState } from 'react'

import { BILLING_TYPE_MAPPING } from '@/common/constants/billingType'
import { useCurrentCompanyId } from '@/common/contexts/user'
import { NumberInput } from '@/components/atoms/NumberInput'
import { MediaGallery } from '@/components/organisms/MediaGallery'
import { SortableMediaItem } from '../../rooms/components/SortableMediaItem'
import type { ServiceFormData } from '../utils/config'
import { VALID_NIGHTS } from '../utils/constants'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'

export const ServiceForm: React.FC = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<ServiceFormData>()

    const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor),
    )

    const handleMediaChange = (selectedMedia: Media[]) => {
        const formattedMedia: ServiceMedia[] = selectedMedia.map(
            (media, index) => {
                const sameMedia = values.medias.find(
                    (item) => item.media.id === media.id,
                )
                const order = sameMedia?.order || index

                return {
                    id: media.id,
                    order,
                    media,
                }
            },
        )

        setFieldValue('medias', formattedMedia)
        setIsMediaGalleryOpen(false)
    }

    const handleMediaDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = values.medias.findIndex(
                (item) => item.media.id === active.id,
            )
            const newIndex = values.medias.findIndex(
                (item) => item.media.id === over.id,
            )

            const newMedias = arrayMove(values.medias, oldIndex, newIndex).map(
                (item, index) => ({
                    ...item,
                    order: index,
                }),
            )

            setFieldValue('medias', newMedias)
        }
    }

    const companyId = useCurrentCompanyId()
    const { data: housingUnitTypes, isLoading: isLoadingHousingUnitTypes } =
        useSearchHousingUnitTypes(
            {
                companyId: companyId,
            },
            {
                pagination: { itemsPerPage: 1000, page: 1 },
            },
        )

    const availableHousingUnitTypes = housingUnitTypes?.items

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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <TextField
                        label="Nome da Experiência"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        fullWidth
                        {...getFieldProps('name')}
                    />

                    <TextField
                        label="Preço Final da Experiência"
                        type="currency"
                        error={touched.price && Boolean(errors.price)}
                        helperText={touched.price && errors.price}
                        fullWidth
                        {...getFieldProps('price')}
                    />
                </Box>

                <Grid
                    container
                    rowSpacing={4}
                    columnSpacing={{
                        xs: 1,
                        sm: 2,
                        md: 3,
                    }}
                >
                    <Grid size={4}>
                        <FormControl fullWidth>
                            <Select
                                value={values.billingType}
                                onChange={(e) =>
                                    setFieldValue('billingType', e.target.value)
                                }
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Selecione um tipo de cobrança
                                </MenuItem>
                                {Object.entries(BILLING_TYPE_MAPPING).map(
                                    ([key, value]) => (
                                        <MenuItem key={key} value={key}>
                                            {value}
                                        </MenuItem>
                                    ),
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={4}>
                        <NumberInput
                            label="Mínimo de Diárias"
                            min={1}
                            error={!!errors.minDaily}
                            helperText={errors.minDaily}
                            {...getFieldProps('minDaily')}
                            onChange={(e) => {
                                const newValueNumber = Number(e.target.value)
                                if (Number.isNaN(newValueNumber)) return
                                setFieldValue('minDaily', newValueNumber)
                            }}
                        />
                    </Grid>

                    <Grid size={4}>
                        <NumberInput
                            label="Antecedência mínima"
                            min={1}
                            error={!!errors.minNotice}
                            helperText={errors.minNotice}
                            {...getFieldProps('minNotice')}
                            onChange={(e) => {
                                const newValueNumber = Number(e.target.value)
                                if (Number.isNaN(newValueNumber)) return
                                setFieldValue(
                                    'minNotice',
                                    Math.round(newValueNumber),
                                )
                            }}
                        />
                    </Grid>
                </Grid>
            </FormSection>

            <FormSection title="Configurações de Venda">
                <Stack spacing={2}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={values.onlineSale}
                                onChange={(e) =>
                                    setFieldValue(
                                        'onlineSale',
                                        e.target.checked,
                                    )
                                }
                            />
                        }
                        label="Vender online no site"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={values.panelSale}
                                onChange={(e) =>
                                    setFieldValue('panelSale', e.target.checked)
                                }
                            />
                        }
                        label="Vender online no painel"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={values.seasonalSale}
                                onChange={(e) =>
                                    setFieldValue(
                                        'seasonalSale',
                                        e.target.checked,
                                    )
                                }
                            />
                        }
                        label="Vender em períodos específicos"
                    />
                </Stack>
            </FormSection>

            {values.seasonalSale && (
                <FormSection title="Períodos de Venda">
                    <Grid container spacing={2} mt={1}>
                        <Grid size={6}>
                            <TextField
                                label="Início do Período de Venda"
                                type="date"
                                fullWidth
                                value={values.seasonStart || ''}
                                onChange={(e) =>
                                    setFieldValue('seasonStart', e.target.value)
                                }
                                error={!!errors.seasonStart}
                                helperText={errors.seasonStart}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                label="Fim do Período de Venda"
                                type="date"
                                fullWidth
                                value={values.seasonEnd || ''}
                                onChange={(e) =>
                                    setFieldValue('seasonEnd', e.target.value)
                                }
                                error={!!errors.seasonEnd}
                                helperText={errors.seasonEnd}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </FormSection>
            )}

            <FormSection title="Adultos">
                <NumberInput
                    label="Número de adultos"
                    min={0}
                    helperText={errors.adults}
                    {...getFieldProps('adults')}
                    onChange={(e) => {
                        const newValueNumber = Number(e.target.value)
                        if (Number.isNaN(newValueNumber)) return
                        setFieldValue('adults', Math.round(newValueNumber))
                    }}
                />
            </FormSection>

            {!isLoadingHousingUnitTypes && !!housingUnitTypes && (
                <FormSection title="Acomodações Válidas">
                    <FormControl component="fieldset">
                        <FormGroup>
                            {availableHousingUnitTypes?.map((housing) => (
                                <FormControlLabel
                                    key={housing.id}
                                    control={
                                        <Checkbox
                                            checked={values.availableHousingUnitTypes.some(
                                                (h) =>
                                                    h.housingUnitTypeId ===
                                                    housing.id,
                                            )}
                                            onChange={(e) => {
                                                const newValue = e.target
                                                    .checked
                                                    ? [
                                                          ...values.availableHousingUnitTypes,
                                                          {
                                                              housingUnitTypeId:
                                                                  housing.id,
                                                          },
                                                      ]
                                                    : values.availableHousingUnitTypes.filter(
                                                          (h) =>
                                                              h.housingUnitTypeId !==
                                                              housing.id,
                                                      )
                                                setFieldValue(
                                                    'availableHousingUnitTypes',
                                                    newValue,
                                                )
                                            }}
                                        />
                                    }
                                    label={housing.name}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                </FormSection>
            )}

            <FormSection title="Noites válidas">
                <FormControl component="fieldset">
                    <FormGroup>
                        <Grid container justifyContent={'space-between'}>
                            {VALID_NIGHTS.map((night) => (
                                <Grid key={night.name}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.availableWeekDays.includes(
                                                    night.value,
                                                )}
                                                onChange={(e) => {
                                                    const newValue = e.target
                                                        .checked
                                                        ? [
                                                              ...values.availableWeekDays,
                                                              night.value,
                                                          ]
                                                        : values.availableWeekDays.filter(
                                                              (v) =>
                                                                  v !==
                                                                  night.value,
                                                          )
                                                    setFieldValue(
                                                        'availableWeekDays',
                                                        newValue,
                                                    )
                                                }}
                                            />
                                        }
                                        label={night.name}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </FormGroup>
                </FormControl>
            </FormSection>

            <FormSection title="Descrição e Informação">
                <TextField
                    multiline
                    rows={4}
                    label="Descrição"
                    error={!!errors.description}
                    helperText={errors.description}
                    {...getFieldProps('description')}
                />

                <TextField
                    sx={{ mt: 2 }}
                    multiline
                    rows={4}
                    label="Informações gerais e observações"
                    error={!!errors.notes}
                    helperText={errors.notes}
                    {...getFieldProps('notes')}
                />
            </FormSection>

            <FormSection title="Fotos e Vídeos">
                <Box
                    p={6}
                    borderRadius={1}
                    sx={{ border: '1px solid', borderColor: 'divider' }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 2,
                        }}
                    >
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Galeria de Fotos
                        </Typography>

                        <Button
                            onClick={() => setIsMediaGalleryOpen(true)}
                            variant="contained"
                            size="small"
                            color="primary"
                        >
                            Selecionar Mídia
                        </Button>
                    </Box>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleMediaDragEnd}
                    >
                        <SortableContext
                            items={values.medias.map((item) => item.media.id)}
                            strategy={rectSortingStrategy}
                        >
                            <Grid container spacing={3} mt={4}>
                                {values.medias.map((item, index) => (
                                    <Grid size={2} key={item.media.id}>
                                        <SortableMediaItem
                                            mediaItem={item}
                                            index={index}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </SortableContext>
                    </DndContext>
                </Box>

                <MediaGallery
                    isOpen={isMediaGalleryOpen}
                    onClose={() => setIsMediaGalleryOpen(false)}
                    selectedItems={values.medias.map((item) => item.media.id)}
                    initialItems={values.medias.map((item) => item.media)}
                    onItemsChange={handleMediaChange}
                />
            </FormSection>
        </FormContainer>
    )
}
