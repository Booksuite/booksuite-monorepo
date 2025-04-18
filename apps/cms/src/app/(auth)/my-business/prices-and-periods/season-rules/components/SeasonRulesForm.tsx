import {
    HousingUnitTypePricingChangeInput,
    PriceVariationType,
    HousingUnitTypePricingChangeInput,
    PriceVariationType,
    useSearchHousingUnitTypes,
} from '@booksuite/sdk'
import {
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
import { useCallback, useEffect } from 'react'
import { useCallback, useEffect } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { SeasonRuleFormData } from '../utils/config'
import { PRICE_VARIATION_TYPE, VALID_NIGHTS } from '../utils/constants'

export const SeasonRulesForm: React.FC = () => {
    const { values, setFieldValue, touched, errors, getFieldProps } =
        useFormikContext<SeasonRuleFormData>()

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

    function applyVariation(base: number, variation: number, type: string) {
        switch (type) {
            case 'ABSOLUTE_INCREASE':
                return base + variation
            case 'ABSOLUTE_REDUCTION':
                return base - variation
            case 'PERCENTAGE_INCREASE':
                return base + (base * variation) / 100
            case 'PERCENTAGE_REDUCTION':
                return base - (base * variation) / 100
            default:
                return base
        }
    }

    const applyNewVariation = useCallback(
        (
            housingUnitTypePrices: HousingUnitTypePricingChangeInput[],
            price: number,
            priceVariationType: PriceVariationType,
        ) => {
            if (priceVariationType !== 'CUSTOM') {
                const updated = housingUnitTypePrices.map((item) => {
                    const newWeekPrice = applyVariation(
                        item.baseWeekPrice ?? 0,
                        Number(price),
                        priceVariationType,
                    )
    const applyNewVariation = useCallback(
        (
            housingUnitTypePrices: HousingUnitTypePricingChangeInput[],
            price: number,
            priceVariationType: PriceVariationType,
        ) => {
            if (priceVariationType !== 'CUSTOM') {
                const updated = housingUnitTypePrices.map((item) => {
                    const newWeekPrice = applyVariation(
                        item.baseWeekPrice ?? 0,
                        Number(price),
                        priceVariationType,
                    )

                    const newWeekendPrice = applyVariation(
                        item.baseWeekendPrice ?? 0,
                        Number(price),
                        priceVariationType,
                    )
                    const newWeekendPrice = applyVariation(
                        item.baseWeekendPrice ?? 0,
                        Number(price),
                        priceVariationType,
                    )

                    return {
                        ...item,
                        finalWeekPrice: newWeekPrice,
                        finalWeekendPrice: newWeekendPrice,
                    }
                })

                    return {
                        ...item,
                        finalWeekPrice: newWeekPrice,
                        finalWeekendPrice: newWeekendPrice,
                    }
                })

                setFieldValue('housingUnitTypePrices', updated)
            }
        },
        [setFieldValue],
    )
        },
        [setFieldValue],
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
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Nome da Temporada"
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            fullWidth
                            {...getFieldProps('name')}
                        />
                    </Grid>

                    <Grid size={6}>
                        <Stack width={'100%'}>
                            <NumberInput
                                label="Mínimo de Diárias"
                                min={1}
                                error={!!errors.minDaily}
                                helperText={errors.minDaily}
                                {...getFieldProps('minDaily')}
                                onChange={(e) => {
                                    const newValueNumber = Number(
                                        e.target.value,
                                    )
                                    if (Number.isNaN(newValueNumber)) return
                                    setFieldValue('minDaily', newValueNumber)
                                }}
                            />
                        </Stack>
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="Início da Temporada"
                            type="date"
                            fullWidth
                            value={values.startDate.split('T').at(0) || ''}
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
                            label="Fim da Temporada"
                            type="date"
                            fullWidth
                            value={values.endDate.split('T').at(0) || ''}
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
                                                        values.availableWeekDays,
                                                    ) &&
                                                    values.availableWeekDays.includes(
                                                    values.availableWeekDays.includes(
                                                        night.value,
                                                    )
                                                }
                                                onChange={(e) => {
                                                    const newValue = e.target
                                                        .checked
                                                        ? [
                                                              ...(values.availableWeekDays ||
                                                              ...(values.availableWeekDays ||
                                                                  []),
                                                              night.value,
                                                          ]
                                                        : (
                                                              values.availableWeekDays ||
                                                              values.availableWeekDays ||
                                                              []
                                                          ).filter(
                                                              (v) =>
                                                                  v !==
                                                                  night.value,
                                                          )

                                                    setFieldValue(
                                                        'availableWeekDays',
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

            {!isLoadingHousingUnitTypes && !!housingUnitTypes && (
                <FormSection title="Categorias Válidas">
                    <FormControl component="fieldset">
                        <Grid container spacing={2}>
                            <Grid size={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                values.housingUnitTypePrices
                                                    .length ===
                                                availableHousingUnitTypes?.length
                                            }
                                            indeterminate={
                                                availableHousingUnitTypes !==
                                                    undefined &&
                                                values.housingUnitTypePrices
                                                    .length > 0 &&
                                                values.housingUnitTypePrices
                                                    .length <
                                                    availableHousingUnitTypes.length
                                            }
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    const allSelected =
                                                        availableHousingUnitTypes?.map(
                                                            (
                                                                housing,
                                                            ): HousingUnitTypePricingChangeInput => ({
                                                                housingUnitTypeId:
                                                                    housing.id,
                                                                baseWeekendPrice:
                                                                    housing.weekendPrice ||
                                                                    0,
                                                            (
                                                                housing,
                                                            ): HousingUnitTypePricingChangeInput => ({
                                                                housingUnitTypeId:
                                                                    housing.id,
                                                                baseWeekendPrice:
                                                                    housing.weekendPrice ||
                                                                    0,
                                                                baseWeekPrice:
                                                                    housing.weekdaysPrice ||
                                                                    0,
                                                                finalWeekendPrice: 0,
                                                                finalWeekPrice: 0,
                                                                finalWeekendPrice: 0,
                                                                finalWeekPrice: 0,
                                                            }),
                                                        )
                                                    setFieldValue(
                                                        'housingUnitTypePrices',
                                                        allSelected,
                                                    )
                                                } else {
                                                    setFieldValue(
                                                        'housingUnitTypePrices',
                                                        [],
                                                    )
                                                }
                                            }}
                                        />
                                    }
                                    label="Selecionar Todos"
                                />
                            </Grid>

                            {availableHousingUnitTypes?.map((housing) => {
                                const exists =
                                    values.housingUnitTypePrices.some(
                                        (h) =>
                                            h.housingUnitTypeId === housing.id,
                                            h.housingUnitTypeId === housing.id,
                                    )

                                return (
                                    <Grid size={3} key={housing.id}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={exists}
                                                    onChange={(e) => {
                                                        const removeHousingUnitType =
                                                            values.housingUnitTypePrices.filter(
                                                                (typePrice) =>
                                                                    typePrice.housingUnitTypeId !==
                                                                    housing.id,
                                                            )
                                                        const removeHousingUnitType =
                                                            values.housingUnitTypePrices.filter(
                                                                (typePrice) =>
                                                                    typePrice.housingUnitTypeId !==
                                                                    housing.id,
                                                            )

                                                        if (e.target.checked) {
                                                            console.log(housing)
                                                            setFieldValue(
                                                                'housingUnitTypePrices',
                                                                [
                                                                    ...values.housingUnitTypePrices,
                                                                    {
                                                                        housingUnitTypeId:
                                                                            housing.id,
                                                                        baseWeekPrice:
                                                                            housing.weekdaysPrice ||
                                                                            0,
                                                                        finalWeekPrice: 0,
                                                                        finalWeekendPrice: 0,
                                                                        baseWeekendPrice: housing.weekendPrice,
                                                                    },
                                                                ],
                                                            )
                                                        } else {
                                                            setFieldValue(
                                                                'housingUnitTypePrices',
                                                                removeHousingUnitType,
                                                                removeHousingUnitType,
                                                            )
                                                        }
                                                    }}
                                                />
                                            }
                                            label={housing.name}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </FormControl>
                </FormSection>
            )}

            <FormSection title="Ajuste de Preço por Diária">
                <FormControl fullWidth>
                    <TextField
                        select
                        label="Tipo de Variação do Preço"
                        value={values.priceVariationType}
                        onChange={(e) => {
                        onChange={(e) => {
                            setFieldValue('priceVariationType', e.target.value)
                            applyNewVariation(
                                values.housingUnitTypePrices,
                                values.price,
                                e.target.value as PriceVariationType,
                            )
                        }}
                            applyNewVariation(
                                values.housingUnitTypePrices,
                                values.price,
                                e.target.value as PriceVariationType,
                            )
                        }}
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

                                applyNewVariation(
                                    values.housingUnitTypePrices,
                                    numeric,
                                    values.priceVariationType,
                                )

                                applyNewVariation(
                                    values.housingUnitTypePrices,
                                    numeric,
                                    values.priceVariationType,
                                )
                            } else {
                                const raw = newValue.replace(/\D/g, '')
                                const numeric = Number(raw) / 100
                                setFieldValue('price', numeric)

                                applyNewVariation(
                                    values.housingUnitTypePrices,
                                    numeric,
                                    values.priceVariationType,
                                )

                                applyNewVariation(
                                    values.housingUnitTypePrices,
                                    numeric,
                                    values.priceVariationType,
                                )
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

            {values.housingUnitTypePrices?.length > 0 && (
                <FormSection>
                    <Grid container spacing={2}>
                        {values.housingUnitTypePrices.map((item, index) => {
                            const housingUnitType =
                                availableHousingUnitTypes?.find(
                                    (housing) =>
                                        housing.id === item.housingUnitTypeId,
                                )
                            const housingUnitType =
                                availableHousingUnitTypes?.find(
                                    (housing) =>
                                        housing.id === item.housingUnitTypeId,
                                )
                            const baseWeek = item.baseWeekPrice ?? 0
                            const baseWeekend = item.baseWeekendPrice ?? 0
                            const baseWeekend = item.baseWeekendPrice ?? 0
                            return (
                                <Grid size={12} key={item.housingUnitTypeId}>
                                <Grid size={12} key={item.housingUnitTypeId}>
                                    <Stack spacing={2}>
                                        <Typography>
                                            {housingUnitType?.name} (preço por
                                            diária)
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
                                                            ].baseWeekPrice =
                                                                numeric
                                                            updated[
                                                                index
                                                            ].finalWeekPrice =
                                                            ].finalWeekPrice =
                                                                applyVariation(
                                                                    numeric,
                                                                    Number(
                                                                        values.price,
                                                                    ),
                                                                    values.priceVariationType,
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
                                                    label="Novo Preço (Semana)"
                                                    fullWidth
                                                    value={formatCurrency(
                                                        item.finalWeekPrice ??
                                                            0,
                                                        item.finalWeekPrice ??
                                                            0,
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
                                                            ].finalWeekPrice =
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
                                                            ].baseWeekendPrice =
                                                            ].baseWeekendPrice =
                                                                numeric
                                                            updated[
                                                                index
                                                            ].baseWeekendPrice =
                                                            ].baseWeekendPrice =
                                                                applyVariation(
                                                                    numeric,
                                                                    Number(
                                                                        values.price,
                                                                    ),
                                                                    values.priceVariationType,
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
                                                    label="Novo Preço (Fim de Semana)"
                                                    fullWidth
                                                    value={formatCurrency(
                                                        item.finalWeekendPrice ??
                                                        item.finalWeekendPrice ??
                                                            0,
                                                    )}
                                                    onChange={(e) => {
                                                        const raw =
                                                            e.target.value.replace(
                                                                /\D/g,
                                                                '',
                                                            )
                                                        const numeric =
                                                            Number(raw) / 100

                                                        const updated: HousingUnitTypePricingChangeInput[] =
                                                        const updated: HousingUnitTypePricingChangeInput[] =
                                                            [
                                                                ...(values.housingUnitTypePrices ??
                                                                    []),
                                                            ]

                                                        if (updated[index]) {
                                                            updated[
                                                                index
                                                            ].finalWeekendPrice =
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
            )}

            {values.housingUnitTypePrices?.length > 0 && (
                <FormSection>
                    <Grid container spacing={2}>
                        {availableHousingUnitTypes
                            ?.filter(
                                (housing) =>
                                    !values.housingUnitTypePrices.some(
                                        (selected) =>
                                            selected.housingUnitTypeId ===
                                            selected.housingUnitTypeId ===
                                            housing.id,
                                    ),
                            )
                            .map((housing) => (
                                <Grid size={12} key={housing.id}>
                                    <Stack spacing={1}>
                                        <Typography>
                                            {housing.name} (preço por diária)
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid size={12}>
                                                <TextField
                                                    label="Preço Base (Semana)"
                                                    value={formatCurrency(
                                                        housing.weekdaysPrice ??
                                                            0,
                                                    )}
                                                    disabled
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid size={12}>
                                                <TextField
                                                    label="Preço Base (Fim de Semana)"
                                                    value={formatCurrency(
                                                        housing.weekendPrice ||
                                                        housing.weekendPrice ||
                                                            0,
                                                    )}
                                                    disabled
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </Grid>
                            ))}
                    </Grid>
                </FormSection>
            )}
        </FormContainer>
    )
}
