import {
    Media,
    SpecialDateMedia,
    useSearchHousingUnitTypes,
} from '@booksuite/sdk'
import { useSearchServices } from '@booksuite/sdk/src/gen/hooks/ServiceHooks'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable'
import {
    Box,
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
import { Info } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { theme } from '@/common/theme'
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

    const { data: servicesData } = useSearchServices(
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
                    housingUnitType: type,
                    baseWeekPrice: type.weekdaysPrice || 0,
                    newWeekPrice: type.weekdaysPrice || 0,
                    weekendBasePrice: type.weekendPrice || 0,
                    weekendNewPrice: type.weekendPrice || 0,
                })),
            )
        }
    }, [housingUnitTypesData, setFieldValue, values.housingUnitTypePrices])

    useEffect(() => {
        if (
            values.priceVariationType !== 'CUSTOM' &&
            values.housingUnitTypePrices?.length > 0 &&
            typeof values.price === 'number'
        ) {
            const currentPrices = values.housingUnitTypePrices
            const shouldUpdate = currentPrices.some((unit) => {
                const newWeekPrice = applyPriceVariation(
                    unit.baseWeekPrice,
                    values.price,
                    values.priceVariationType,
                )
                const newWeekendPrice = applyPriceVariation(
                    unit.weekendBasePrice,
                    values.price,
                    values.priceVariationType,
                )
                return (
                    Math.abs(unit.newWeekPrice - newWeekPrice) > 0.01 ||
                    Math.abs(unit.weekendNewPrice - newWeekendPrice) > 0.01
                )
            })

            if (shouldUpdate) {
                const updatedPrices = currentPrices.map((unit) => ({
                    ...unit,
                    newWeekPrice: applyPriceVariation(
                        unit.baseWeekPrice,
                        values.price,
                        values.priceVariationType,
                    ),
                    weekendNewPrice: applyPriceVariation(
                        unit.weekendBasePrice,
                        values.price,
                        values.priceVariationType,
                    ),
                }))
                setFieldValue('housingUnitTypePrices', updatedPrices)
            }
        }
    }, [
        values.price,
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

            <FormSection title="Períodos de hospedagem">
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Início do Período de Estadia"
                            type="date"
                            fullWidth
                            value={values.startDate || ''}
                            onChange={(e) =>
                                setFieldValue('startDate', e.target.value)
                            }
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
                        />
                    </Grid>
                </Grid>

                <Stack width={'100%'}>
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
                </Stack>
            </FormSection>

            <FormSection title="Noites válidas">
                <FormControl component="fieldset">
                    <FormGroup>
                        <Grid container justifyContent={'space-between'}>
                            {VALID_NIGHTS.map((night) => (
                                <Grid key={night.name}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    Array.isArray(
                                                        values.availableWeekDays,
                                                    ) &&
                                                    values.availableWeekDays.includes(
                                                        night.value,
                                                    )
                                                }
                                                onChange={(e) => {
                                                    const newValue = e.target
                                                        .checked
                                                        ? [
                                                              ...(values.availableWeekDays ||
                                                                  []),
                                                              night.value,
                                                          ]
                                                        : (
                                                              values.availableWeekDays ||
                                                              []
                                                          ).filter(
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

            <FormSection title="Extras e Experiências Inclusas">
                <FormControl component="fieldset">
                    <FormGroup>
                        <Grid container spacing={2}>
                            {servicesData?.items?.map((service) => (
                                <Grid size={6} key={service.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name={`services.${service.id}`}
                                                checked={values.services?.includes(
                                                    service.id,
                                                )}
                                                onChange={(e) => {
                                                    const serviceId = service.id
                                                    const newServices = e.target
                                                        .checked
                                                        ? [
                                                              ...(values.services ||
                                                                  []),
                                                              serviceId,
                                                          ]
                                                        : (
                                                              values.services ||
                                                              []
                                                          ).filter(
                                                              (id) =>
                                                                  id !==
                                                                  serviceId,
                                                          )
                                                    setFieldValue(
                                                        'services',
                                                        newServices,
                                                    )
                                                }}
                                            />
                                        }
                                        label={service.name}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </FormGroup>
                </FormControl>
                <Box
                    bgcolor={'grey.100'}
                    p={4}
                    borderRadius={1}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <Info color={theme.palette.blue[900]} />
                        <Typography variant="body1" color={'blue.900'}>
                            <b>Atenção: </b> os preços dos itens não são
                            calculados automaticamente na diária.
                        </Typography>
                    </Box>
                </Box>
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
                        error={touched.price && Boolean(errors.price)}
                        helperText={touched.price && errors.price}
                        value={
                            values.priceVariationType ===
                                'PERCENTAGE_INCREASE' ||
                            values.priceVariationType === 'PERCENTAGE_REDUCTION'
                                ? values.price
                                : formatCurrency(values.price || 0)
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
                                setFieldValue('price', numeric)
                            } else {
                                const raw = newValue.replace(/\D/g, '')
                                const numeric = Number(raw) / 100
                                setFieldValue('price', numeric)
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
                    {values.housingUnitTypePrices.map((item, index) => {
                        const baseWeek = item.baseWeekPrice ?? 0
                        const baseWeekend = item.weekendBasePrice ?? 0
                        return (
                            <Grid size={12} key={item.housingUnitType.id}>
                                <Stack spacing={2}>
                                    <Typography>
                                        {item.housingUnitType.name} (preço por
                                        diária)
                                    </Typography>

                                    <Grid container spacing={2}>
                                        <Grid size={6}>
                                            <TextField
                                                label="Preço Base (Semana)"
                                                fullWidth
                                                disabled
                                                value={formatCurrency(baseWeek)}
                                            />
                                        </Grid>
                                        <Grid size={6}>
                                            <TextField
                                                label="Novo Preço (Semana)"
                                                fullWidth
                                                value={formatCurrency(
                                                    item.newWeekPrice ?? 0,
                                                )}
                                                onChange={(e) => {
                                                    const raw =
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            '',
                                                        )
                                                    const numeric =
                                                        Number(raw) / 100

                                                    const updated = [
                                                        ...(values.housingUnitTypePrices ??
                                                            []),
                                                    ]

                                                    if (updated[index]) {
                                                        updated[
                                                            index
                                                        ].newWeekPrice = numeric
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
                                                label="Novo Preço (Fim de Semana)"
                                                fullWidth
                                                value={formatCurrency(
                                                    item.weekendNewPrice ?? 0,
                                                )}
                                                onChange={(e) => {
                                                    const raw =
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            '',
                                                        )
                                                    const numeric =
                                                        Number(raw) / 100

                                                    const updated = [
                                                        ...(values.housingUnitTypePrices ??
                                                            []),
                                                    ]

                                                    if (updated[index]) {
                                                        updated[
                                                            index
                                                        ].weekendNewPrice =
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
