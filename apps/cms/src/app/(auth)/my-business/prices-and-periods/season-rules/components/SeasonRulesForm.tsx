import {
    SeasonRuleHousingUnitType,
    useSearchHousingUnitTypes,
} from '@booksuite/sdk'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
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

    useEffect(() => {
        if (values.priceVariationType !== 'CUSTOM') {
            const updated = values.housingUnitTypePrices.map((item) => {
                const newWeekPrice = applyVariation(
                    item.baseWeekPrice ?? 0,
                    Number(values.price),
                    values.priceVariationType,
                )

                const newWeekendPrice = applyVariation(
                    item.weekendBasePrice ?? 0,
                    Number(values.price),
                    values.priceVariationType,
                )

                return {
                    ...item,
                    newWeekPrice,
                    weekendNewPrice: newWeekendPrice,
                }
            })

            const hasChanged = updated.some((item, index) => {
                const original = values.housingUnitTypePrices[index]
                return (
                    item.newWeekPrice !== original?.newWeekPrice ||
                    item.weekendNewPrice !== original?.weekendNewPrice
                )
            })

            if (hasChanged) {
                setFieldValue('housingUnitTypePrices', updated)
            }
        }
    }, [
        setFieldValue,
        values.housingUnitTypePrices,
        values.price,
        values.priceVariationType,
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
                            label="Fim da Temporada"
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
                                                        values.availableWeekend,
                                                    ) &&
                                                    values.availableWeekend.includes(
                                                        night.value,
                                                    )
                                                }
                                                onChange={(e) => {
                                                    const newValue = e.target
                                                        .checked
                                                        ? [
                                                              ...(values.availableWeekend ||
                                                                  []),
                                                              night.value,
                                                          ]
                                                        : (
                                                              values.availableWeekend ||
                                                              []
                                                          ).filter(
                                                              (v) =>
                                                                  v !==
                                                                  night.value,
                                                          )
                                                    setFieldValue(
                                                        'availableWeekend',
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
                                                            (housing) => ({
                                                                housingUnitType:
                                                                    housing,
                                                                baseWeekPrice:
                                                                    housing.weekdaysPrice ||
                                                                    0,
                                                                newWeekPrice: 0,
                                                                weekendBasePrice:
                                                                    housing.weekendPrice ||
                                                                    0,
                                                                weekendNewPrice: 0,
                                                                id: '',
                                                                seasonRuleId:
                                                                    '',
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
                                            h.housingUnitType.id === housing.id,
                                    )

                                return (
                                    <Grid size={3} key={housing.id}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={exists}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...(values.housingUnitTypePrices ??
                                                                []),
                                                        ]

                                                        if (e.target.checked) {
                                                            updated.push({
                                                                housingUnitType:
                                                                    housing,
                                                                baseWeekPrice:
                                                                    housing.weekdaysPrice ||
                                                                    0,
                                                                newWeekPrice: 0,
                                                                weekendBasePrice:
                                                                    housing.weekendPrice ||
                                                                    0,
                                                                weekendNewPrice: 0,
                                                                id: '',
                                                                seasonRuleId:
                                                                    '',
                                                            })
                                                        } else {
                                                            const filtered =
                                                                updated.filter(
                                                                    (h) =>
                                                                        h
                                                                            .housingUnitType
                                                                            .id !==
                                                                        housing.id,
                                                                )
                                                            setFieldValue(
                                                                'housingUnitTypePrices',
                                                                filtered,
                                                            )
                                                            return
                                                        }

                                                        setFieldValue(
                                                            'housingUnitTypePrices',
                                                            updated,
                                                        )
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
                        type="number"
                        error={touched.price && Boolean(errors.price)}
                        helperText={touched.price && errors.price}
                        fullWidth
                        value={values.price || ''}
                        onChange={(e) => {
                            let newValue: string | number = e.target.value
                            if (
                                values.priceVariationType ===
                                    'PERCENTAGE_INCREASE' ||
                                values.priceVariationType ===
                                    'PERCENTAGE_REDUCTION'
                            ) {
                                newValue = Math.max(
                                    0,
                                    Math.min(100, Number(newValue)),
                                )
                            }
                            setFieldValue('price', Number(newValue))
                        }}
                        InputProps={{
                            endAdornment:
                                values.priceVariationType ===
                                    'PERCENTAGE_INCREASE' ||
                                values.priceVariationType ===
                                    'PERCENTAGE_REDUCTION'
                                    ? '%'
                                    : '',
                        }}
                    />
                )}
            </FormSection>

            {values.housingUnitTypePrices?.length > 0 && (
                <FormSection>
                    <Grid container spacing={2}>
                        {values.housingUnitTypePrices.map((item, index) => {
                            const baseWeek = item.baseWeekPrice ?? 0
                            const baseWeekend = item.weekendBasePrice ?? 0
                            return (
                                <Grid size={12} key={item.housingUnitType.id}>
                                    <Stack spacing={2}>
                                        <Typography>
                                            {item.housingUnitType.name} (preço
                                            por diária)
                                        </Typography>

                                        <Grid container spacing={2}>
                                            <Grid size={6}>
                                                <TextField
                                                    label="Preço Base (Semana)"
                                                    disabled
                                                    value={baseWeek}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...(values.housingUnitTypePrices ??
                                                                []),
                                                        ]

                                                        if (updated[index]) {
                                                            updated[
                                                                index
                                                            ].baseWeekPrice =
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            updated[
                                                                index
                                                            ].newWeekPrice =
                                                                applyVariation(
                                                                    Number(
                                                                        e.target
                                                                            .value,
                                                                    ),
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
                                                    type="number"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <TextField
                                                    label="Novo Preço (Semana)"
                                                    type="number"
                                                    value={
                                                        item.newWeekPrice ?? 0
                                                    }
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...(values.housingUnitTypePrices ??
                                                                []),
                                                        ]

                                                        if (updated[index]) {
                                                            updated[
                                                                index
                                                            ].newWeekPrice =
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                )

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
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <TextField
                                                    label="Preço Base (Fim de Semana)"
                                                    disabled
                                                    value={baseWeekend}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...(values.housingUnitTypePrices ??
                                                                []),
                                                        ]

                                                        if (updated[index]) {
                                                            updated[
                                                                index
                                                            ].weekendBasePrice =
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            updated[
                                                                index
                                                            ].weekendNewPrice =
                                                                applyVariation(
                                                                    Number(
                                                                        e.target
                                                                            .value,
                                                                    ),
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
                                                    type="number"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <TextField
                                                    label="Novo Preço (Fim de Semana)"
                                                    type="number"
                                                    value={
                                                        item.weekendNewPrice ??
                                                        0
                                                    }
                                                    onChange={(e) => {
                                                        const updated: SeasonRuleHousingUnitType[] =
                                                            [
                                                                ...(values.housingUnitTypePrices ??
                                                                    []),
                                                            ]

                                                        if (updated[index]) {
                                                            updated[
                                                                index
                                                            ].weekendNewPrice =
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                )

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
                                                    fullWidth
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
                                            selected.housingUnitType.id ===
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
                                                    value={
                                                        housing.weekdaysPrice ??
                                                        0
                                                    }
                                                    disabled
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid size={12}>
                                                <TextField
                                                    label="Preço Base (Fim de Semana)"
                                                    value={
                                                        housing.weekendPrice ??
                                                        0
                                                    }
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
