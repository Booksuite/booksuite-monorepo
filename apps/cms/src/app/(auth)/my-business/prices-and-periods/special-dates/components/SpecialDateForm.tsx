import {
    Media,
    SpecialDateMedia,
    useSearchHousingUnitTypes,
} from '@booksuite/sdk'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputAdornment,
    MenuItem,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { useFormikContext } from 'formik'
import { useEffect, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { MediaGallery } from '@/components/organisms/MediaGallery'
import { SpecialDateFormData } from '../utils/config'
import { PRICE_VARIATION_TYPE, VALID_NIGHTS } from '../utils/constants'

import { SortableMediaItem } from './SortableMediaItem'

const applyPriceVariation = (
    basePrice: number,
    variation: number,
    type: string,
) => {
    switch (type) {
        case 'ABSOLUTE_INCREASE':
            return basePrice + variation
        case 'ABSOLUTE_REDUCTION':
            return Math.max(0, basePrice - variation)
        case 'PERCENTAGE_INCREASE':
            return basePrice * (1 + variation / 100)
        case 'PERCENTAGE_REDUCTION':
            return basePrice * (1 - variation / 100)
        default:
            return basePrice
    }
}

export const SpecialDateForm: React.FC = () => {
    const { values, setFieldValue, touched, errors, getFieldProps } =
        useFormikContext<SpecialDateFormData>()
    const companyId = useCurrentCompanyId()
    const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false)

    const { data: housingUnitTypesData } = useSearchHousingUnitTypes(
        { companyId },
        { pagination: { page: 1, itemsPerPage: 100 } },
    )

    const handleMediaChange = (selectedMedia: Media[]) => {
        const formattedMedia: SpecialDateMedia[] = selectedMedia.map(
            (media, index) => {
                const existingMedia = values.medias?.find(
                    (item) => item.media.id === media.id,
                )
                return {
                    id: existingMedia?.id || media.id,
                    order: existingMedia?.order || index,
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

    useEffect(() => {
        if (
            housingUnitTypesData?.items &&
            housingUnitTypesData.items.length > 0 &&
            !values.housingUnitTypePrices?.length
        ) {
            setFieldValue(
                'housingUnitTypePrices',
                housingUnitTypesData.items.map((type) => ({
                    housingUnitTypeId: type.id,
                    baseWeekPrice: type.weekdaysPrice || 0,
                    finalWeekPrice: type.weekdaysPrice || 0,
                    baseWeekendPrice: type.weekendPrice || 0,
                    finalWeekendPrice: type.weekendPrice || 0,
                })),
            )
        }
    }, [housingUnitTypesData, setFieldValue, values.housingUnitTypePrices])

    useEffect(() => {
        if (
            values.priceVariationType !== 'CUSTOM' &&
            values.housingUnitTypePrices?.length > 0 &&
            typeof values.priceVariationValue === 'number'
        ) {
            const currentPrices = values.housingUnitTypePrices
            const shouldUpdate = currentPrices.some((unit) => {
                const newWeekPrice = applyPriceVariation(
                    unit.baseWeekPrice,
                    values.priceVariationValue,
                    values.priceVariationType,
                )
                const newWeekendPrice = applyPriceVariation(
                    unit.baseWeekendPrice,
                    values.priceVariationValue,
                    values.priceVariationType,
                )
                return (
                    Math.abs(unit.finalWeekPrice - newWeekPrice) > 0.01 ||
                    Math.abs(unit.finalWeekendPrice - newWeekendPrice) > 0.01
                )
            })

            if (shouldUpdate) {
                const updatedPrices = currentPrices.map((unit) => ({
                    ...unit,
                    finalWeekPrice: applyPriceVariation(
                        unit.baseWeekPrice,
                        values.priceVariationValue,
                        values.priceVariationType,
                    ),
                    finalWeekendPrice: applyPriceVariation(
                        unit.baseWeekendPrice,
                        values.priceVariationValue,
                        values.priceVariationType,
                    ),
                }))
                setFieldValue('housingUnitTypePrices', updatedPrices)
            }
        }
    }, [
        values.priceVariationValue,
        values.priceVariationType,
        values.housingUnitTypePrices,
        setFieldValue,
    ])

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
                    label="Nome"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    {...getFieldProps('name')}
                />
            </FormSection>

            <FormSection title="Data de visibilidade">
                <TextField
                    label="Data de início de visibilidade"
                    type="date"
                    fullWidth
                    value={values.visibilityStartDate || ''}
                    onChange={(e) =>
                        setFieldValue('visibilityStartDate', e.target.value)
                    }
                    error={!!errors.visibilityStartDate}
                    helperText={errors.visibilityStartDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormSection>

            <FormSection title="Períodos de hospedagem">
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Início do Período de Estadia"
                            type="date"
                            fullWidth
                            value={values.startDate || ''}
                            onChange={(e) => {
                                setFieldValue('startDate', e.target.value)
                                if (
                                    values.endDate &&
                                    e.target.value > values.endDate
                                ) {
                                    setFieldValue('endDate', e.target.value)
                                }
                            }}
                            error={!!errors.startDate}
                            helperText={errors.startDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Final do Período de Estadia"
                            type="date"
                            fullWidth
                            value={values.endDate || ''}
                            onChange={(e) =>
                                setFieldValue('endDate', e.target.value)
                            }
                            error={!!errors.endDate}
                            helperText={errors.endDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: values.startDate || undefined,
                            }}
                        />
                    </Grid>
                </Grid>

                <Stack width={'100%'}>
                    <NumberInput
                        label="Mínimo de Diárias"
                        min={1}
                        error={!!errors.minStay}
                        helperText={errors.minStay}
                        {...getFieldProps('minStay')}
                        onChange={(e) => {
                            const newValueNumber = Number(e.target.value)
                            if (Number.isNaN(newValueNumber)) return
                            setFieldValue('minStay', newValueNumber)
                        }}
                    />
                </Stack>
            </FormSection>

            <FormSection title="Noites válidas">
                <FormControl component="fieldset">
                    <FormGroup>
                        <Grid container justifyContent={'space-between'}>
                            <Grid size={2.5}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                values.validWeekDays.length ===
                                                VALID_NIGHTS.length
                                            }
                                            onChange={(e) => {
                                                const newValue = e.target
                                                    .checked
                                                    ? VALID_NIGHTS.map(
                                                          (night) =>
                                                              Number(
                                                                  night.value,
                                                              ),
                                                      )
                                                    : []
                                                setFieldValue(
                                                    'validWeekDays',
                                                    newValue,
                                                )
                                            }}
                                        />
                                    }
                                    label="Selecionar todas"
                                />
                            </Grid>
                            {VALID_NIGHTS.map((night) => (
                                <Grid size={2.5} key={night.name}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    Array.isArray(
                                                        values.validWeekDays,
                                                    ) &&
                                                    values.validWeekDays.includes(
                                                        Number(night.value),
                                                    )
                                                }
                                                onChange={(e) => {
                                                    const newValue = e.target
                                                        .checked
                                                        ? [
                                                              ...(values.validWeekDays ||
                                                                  []),
                                                              Number(
                                                                  night.value,
                                                              ),
                                                          ]
                                                        : (
                                                              values.validWeekDays ||
                                                              []
                                                          ).filter(
                                                              (v) =>
                                                                  v !==
                                                                  Number(
                                                                      night.value,
                                                                  ),
                                                          )

                                                    setFieldValue(
                                                        'validWeekDays',
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

            <FormSection title="Ajuste de Preço por Diária">
                <FormControl fullWidth>
                    <TextField
                        select
                        label="Tipo de Variação do Preço"
                        value={values.priceVariationType}
                        onChange={(e) =>
                            setFieldValue('priceVariationType', e.target.value)
                        }
                    >
                        {PRICE_VARIATION_TYPE.map(({ label, value }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>

                {values.priceVariationType !== 'CUSTOM' && (
                    <TextField
                        label="Variação de Preço Geral"
                        fullWidth
                        error={
                            touched.priceVariationValue &&
                            Boolean(errors.priceVariationValue)
                        }
                        helperText={
                            touched.priceVariationValue &&
                            errors.priceVariationValue
                        }
                        value={
                            values.priceVariationType ===
                                'PERCENTAGE_INCREASE' ||
                            values.priceVariationType === 'PERCENTAGE_REDUCTION'
                                ? values.priceVariationValue
                                : formatCurrency(
                                      values.priceVariationValue || 0,
                                  )
                        }
                        onChange={(e) => {
                            const newValue = e.target.value

                            if (
                                values.priceVariationType ===
                                    'PERCENTAGE_INCREASE' ||
                                values.priceVariationType ===
                                    'PERCENTAGE_REDUCTION'
                            ) {
                                const numeric = Math.max(
                                    0,
                                    Math.min(100, Number(newValue)),
                                )
                                setFieldValue('priceVariationValue', numeric)
                            } else {
                                const raw = newValue.replace(/\D/g, '')
                                const numeric = Number(raw) / 100
                                setFieldValue('priceVariationValue', numeric)
                            }
                        }}
                        InputProps={{
                            startAdornment:
                                values.priceVariationType ===
                                    'PERCENTAGE_INCREASE' ||
                                values.priceVariationType ===
                                    'PERCENTAGE_REDUCTION' ? (
                                    <InputAdornment position="start">
                                        %
                                    </InputAdornment>
                                ) : undefined,
                        }}
                    />
                )}
            </FormSection>

            <FormSection>
                <Grid container spacing={2}>
                    {values.housingUnitTypePrices
                        .filter((item) => {
                            const housingUnitType =
                                housingUnitTypesData?.items.find(
                                    (type) =>
                                        type.id === item.housingUnitTypeId,
                                )
                            return housingUnitType?.published
                        })
                        .map((item, index) => {
                            const baseWeek = item.baseWeekPrice ?? 0
                            const baseWeekend = item.baseWeekendPrice ?? 0
                            const housingUnitType =
                                housingUnitTypesData?.items.find(
                                    (type) =>
                                        type.id === item.housingUnitTypeId,
                                )
                            return (
                                <Grid size={12} key={item.housingUnitTypeId}>
                                    <Stack spacing={2}>
                                        <Typography>
                                            {housingUnitType?.name} (preço por
                                            diária)
                                        </Typography>

                                        <Grid container spacing={2}>
                                            <Grid size={6}>
                                                <TextField
                                                    label="Preço Base (Semana)"
                                                    fullWidth
                                                    disabled
                                                    value={formatCurrency(
                                                        baseWeek,
                                                    )}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <TextField
                                                    label="Preço Final (Semana)"
                                                    fullWidth
                                                    value={formatCurrency(
                                                        item.finalWeekPrice ??
                                                            0,
                                                    )}
                                                    onChange={(e) => {
                                                        const raw =
                                                            e.target.value
                                                                .replace(
                                                                    /[^0-9]/g,
                                                                    '',
                                                                )
                                                                .replace(
                                                                    /^0+/,
                                                                    '0',
                                                                )
                                                        const numeric =
                                                            Number(raw) / 100

                                                        const updated = [
                                                            ...values.housingUnitTypePrices,
                                                        ]

                                                        if (updated[index]) {
                                                            updated[
                                                                index
                                                            ].finalWeekPrice =
                                                                numeric
                                                            setFieldValue(
                                                                'priceVariationType',
                                                                'CUSTOM',
                                                            )
                                                            setFieldValue(
                                                                'housingUnitTypePrices',
                                                                updated,
                                                            )
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <TextField
                                                    label="Preço Base (Fim de Semana)"
                                                    fullWidth
                                                    disabled
                                                    value={formatCurrency(
                                                        baseWeekend,
                                                    )}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <TextField
                                                    label="Preço Final (Fim de Semana)"
                                                    fullWidth
                                                    value={formatCurrency(
                                                        item.finalWeekendPrice ??
                                                            0,
                                                    )}
                                                    onChange={(e) => {
                                                        const raw =
                                                            e.target.value
                                                                .replace(
                                                                    /[^0-9]/g,
                                                                    '',
                                                                )
                                                                .replace(
                                                                    /^0+/,
                                                                    '0',
                                                                )
                                                        const numeric =
                                                            Number(raw) / 100

                                                        const updated = [
                                                            ...values.housingUnitTypePrices,
                                                        ]

                                                        if (updated[index]) {
                                                            updated[
                                                                index
                                                            ].finalWeekendPrice =
                                                                numeric
                                                            setFieldValue(
                                                                'priceVariationType',
                                                                'CUSTOM',
                                                            )
                                                            setFieldValue(
                                                                'housingUnitTypePrices',
                                                                updated,
                                                            )
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </Grid>
                            )
                        })}
                </Grid>
            </FormSection>

            <FormSection title="Informações">
                <TextField
                    label="Descrição"
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    fullWidth
                    multiline
                    rows={5}
                    {...getFieldProps('description')}
                />
                <TextField
                    label="Informações gerais e observações"
                    error={
                        touched.generalDescription &&
                        Boolean(errors.generalDescription)
                    }
                    helperText={
                        touched.generalDescription && errors.generalDescription
                    }
                    fullWidth
                    multiline
                    rows={5}
                    {...getFieldProps('generalDescription')}
                />
            </FormSection>

            <FormSection
                title="Fotos e vídeos"
                variant="outlined"
                rightAction={
                    <Button onClick={() => setIsMediaGalleryOpen(true)}>
                        Selecionar Mídia
                    </Button>
                }
            >
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleMediaDragEnd}
                >
                    <SortableContext
                        items={values.medias.map((item) => item.media.id)}
                        strategy={rectSortingStrategy}
                    >
                        <Grid container columns={[2, 4, 8]} spacing={2} mt={4}>
                            {values.medias.map((item) => (
                                <Grid size={1} key={item.media.id}>
                                    <SortableMediaItem
                                        key={item.media.id}
                                        mediaItem={item}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </SortableContext>
                </DndContext>

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
