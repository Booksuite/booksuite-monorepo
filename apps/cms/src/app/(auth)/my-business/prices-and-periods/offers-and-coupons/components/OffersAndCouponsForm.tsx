import { useSearchHousingUnitTypes, useSearchServices } from '@booksuite/sdk'
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
} from '@mui/material'
import { useFormikContext } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { OfferFormData } from '../utils/config'
import {
    PRICE_VARIATION_TYPE,
    TYPE_OPTIONS,
    VALID_NIGHTS,
} from '../utils/constants'

import { MultiSelectList } from './MultiSelectList'

export const OffersAndCouponsForm = () => {
    const { values, errors, touched, getFieldProps, setFieldValue } =
        useFormikContext<OfferFormData>()
    const companyId = useCurrentCompanyId()
    const { data: services } = useSearchServices(
        { companyId },
        {
            pagination: { itemsPerPage: 1000, page: 1 },
        },
    )

    const serviceItems = services?.items || []

    const { data: housingUnitTypes } = useSearchHousingUnitTypes(
        {
            companyId: companyId,
        },
        {
            pagination: { itemsPerPage: 1000, page: 1 },
        },
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
                    select
                    label="Tipo de oferta"
                    value={values.type}
                    onChange={(e) => setFieldValue('type', e.target.value)}
                >
                    <MenuItem value="" disabled>
                        Selecione um tipo de oferta
                    </MenuItem>
                    {Object.entries(TYPE_OPTIONS).map(([key, label]) => (
                        <MenuItem key={key} value={key}>
                            {label}
                        </MenuItem>
                    ))}
                </TextField>
            </FormSection>
            <FormSection>
                <TextField
                    label={'Nome da oferta'}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    {...getFieldProps('name')}
                />

                <TextField
                    label={'Descrição (Opcional)'}
                    rows={4}
                    multiline
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    fullWidth
                    {...getFieldProps('description')}
                />

                <FormSection>
                    <FormControlLabel
                        control={<Switch checked={values.isExclusive} />}
                        label="Oferta exclusiva com cupom?"
                        onChange={(e) =>
                            setFieldValue(
                                'isExclusive',
                                (e.target as HTMLInputElement).checked,
                            )
                        }
                    />

                    <TextField
                        label="Código do Cupom"
                        error={touched.couponCode && Boolean(errors.couponCode)}
                        helperText={touched.couponCode && errors.couponCode}
                        {...getFieldProps('couponCode')}
                        inputProps={{
                            style: { textTransform: 'uppercase' },
                        }}
                        onChange={(e) => {
                            const raw = e.target.value
                            const cleaned = raw
                                .replace(/[^a-zA-Z0-9]/g, '')
                                .toUpperCase()
                            setFieldValue('couponCode', cleaned)
                        }}
                    />
                </FormSection>
            </FormSection>

            <FormSection title="Períodos Válidos">
                <FormSection title="Períodos de compra">
                    <TextField
                        label="Início do período de compra"
                        type="date"
                        error={
                            touched.visibilityStartDate &&
                            Boolean(errors.visibilityStartDate)
                        }
                        helperText={
                            touched.visibilityStartDate &&
                            errors.visibilityStartDate
                        }
                        {...getFieldProps('visibilityStartDate')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormSection>

                <FormSection title="Períodos de estadia">
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField
                                label="Início do período de estadia"
                                type="date"
                                error={
                                    touched.startDate &&
                                    Boolean(errors.startDate)
                                }
                                helperText={
                                    touched.startDate && errors.startDate
                                }
                                {...getFieldProps('startDate')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                label="Fim do período de estadia"
                                type="date"
                                error={
                                    touched.endDate && Boolean(errors.endDate)
                                }
                                helperText={touched.endDate && errors.endDate}
                                {...getFieldProps('endDate')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </FormSection>
            </FormSection>

            <FormSection title="Ajuste de Preço">
                <FormControl fullWidth>
                    <TextField
                        select
                        label="Tipo de Variação do Preço"
                        value={values.priceAdjustmentType}
                        onChange={(e) =>
                            setFieldValue('priceAdjustmentType', e.target.value)
                        }
                    >
                        {PRICE_VARIATION_TYPE.map(({ label, value }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>

                <TextField
                    label="Variação de Preço Geral"
                    fullWidth
                    error={
                        touched.priceAdjustmentValue &&
                        Boolean(errors.priceAdjustmentValue)
                    }
                    helperText={
                        touched.priceAdjustmentValue &&
                        errors.priceAdjustmentValue
                    }
                    value={
                        values.priceAdjustmentType === 'PERCENTAGE_INCREASE' ||
                        values.priceAdjustmentType === 'PERCENTAGE_REDUCTION'
                            ? values.priceAdjustmentValue
                            : formatCurrency(values.priceAdjustmentValue || 0)
                    }
                    onChange={(e) => {
                        const newValue = e.target.value

                        if (
                            values.priceAdjustmentType ===
                                'PERCENTAGE_INCREASE' ||
                            values.priceAdjustmentType ===
                                'PERCENTAGE_REDUCTION'
                        ) {
                            const numeric = Math.max(
                                0,
                                Math.min(100, Number(newValue)),
                            )
                            setFieldValue('priceAdjustmentValue', numeric)
                        } else {
                            const raw = newValue.replace(/\D/g, '')
                            const numeric = Number(raw) / 100
                            setFieldValue('priceAdjustmentValue', numeric)
                        }
                    }}
                    InputProps={{
                        startAdornment:
                            values.priceAdjustmentType ===
                                'PERCENTAGE_INCREASE' ||
                            values.priceAdjustmentType ===
                                'PERCENTAGE_REDUCTION' ? (
                                <InputAdornment position="start">
                                    %
                                </InputAdornment>
                            ) : undefined,
                    }}
                />
            </FormSection>

            {values.type === 'HOUSING_UNIT_TYPE' && (
                <MultiSelectList
                    title="Acomodações Válidas"
                    items={housingUnitTypes?.items ?? []}
                    selected={values.validHousingUnitTypes ?? []}
                    onChange={(newSelected) =>
                        setFieldValue('validHousingUnitTypes', newSelected)
                    }
                />
            )}

            {values.type === 'SERVICE' && (
                <MultiSelectList
                    title="Itens Válidos"
                    items={serviceItems}
                    selected={values.validServices ?? []}
                    onChange={(newSelected) =>
                        setFieldValue('validServices', newSelected)
                    }
                />
            )}

            <FormSection title="Filtros de aplicação">
                {/* TODO - FORMAS DE PAGAMENTO */}
                {/* <FormSection title="Formas de pagamento">
                <FormControl>
                    <FormGroup>
                        <Grid container>
                            {PAY_METHODS.map((methods) => (
                                <Grid key={methods.name}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={methods.name}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </FormGroup>
                </FormControl>
            </FormSection> */}

                <FormSection title="Noites válidas">
                    <FormControl>
                        <FormGroup>
                            <Grid container justifyContent={'space-between'}>
                                <Grid size={2.5}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    Array.isArray(
                                                        values.validWeekDays,
                                                    ) &&
                                                    values.validWeekDays
                                                        .length ===
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
                                                        const newValue = e
                                                            .target.checked
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
            </FormSection>

            <FormSection title="Condições de Aplicabilidade">
                <Stack spacing={2}>
                    <Stack width={'100%'}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={values.hasMinStay}
                                    onChange={(e) => {
                                        setFieldValue(
                                            'hasMinStay',
                                            e.target.checked,
                                        )
                                        if (e.target.checked) {
                                            setFieldValue('minStay', 1)
                                        } else {
                                            setFieldValue('minStay', undefined)
                                        }
                                    }}
                                />
                            }
                            label="Restringir estadia mínima"
                        />
                        {values.hasMinStay && (
                            <NumberInput
                                label="Estadia Mínima (opcional)"
                                error={
                                    touched.minStay && Boolean(errors.minStay)
                                }
                                helperText={errors.minStay}
                                min={1}
                                max={values.maxStay}
                                {...getFieldProps('minStay')}
                                onChange={(e) => {
                                    const newValue = e.target.value
                                    if (newValue === '') {
                                        setFieldValue('minStay', undefined)
                                    } else {
                                        setFieldValue(
                                            'minStay',
                                            Number(newValue),
                                        )
                                    }
                                }}
                            />
                        )}
                    </Stack>
                    <Stack width={'100%'}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={values.hasMaxStay}
                                    onChange={(e) => {
                                        setFieldValue(
                                            'hasMaxStay',
                                            e.target.checked,
                                        )
                                        if (e.target.checked) {
                                            setFieldValue(
                                                'maxStay',
                                                values.minStay || 1,
                                            )
                                        } else {
                                            setFieldValue('maxStay', undefined)
                                        }
                                    }}
                                />
                            }
                            label="Restringir estadia máxima"
                        />
                        {values.hasMaxStay && (
                            <NumberInput
                                label="Estadia Máxima (opcional)"
                                error={
                                    touched.maxStay && Boolean(errors.maxStay)
                                }
                                helperText={errors.maxStay}
                                min={values.minStay || 1}
                                {...getFieldProps('maxStay')}
                                onChange={(e) => {
                                    const newValue = e.target.value
                                    if (newValue === '') {
                                        setFieldValue('maxStay', undefined)
                                    } else {
                                        setFieldValue(
                                            'maxStay',
                                            Number(newValue),
                                        )
                                    }
                                }}
                            />
                        )}
                    </Stack>
                </Stack>
                <Stack spacing={2}>
                    <Stack width={'100%'}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={values.hasMinAdvanceDays}
                                    onChange={(e) => {
                                        setFieldValue(
                                            'hasMinAdvanceDays',
                                            e.target.checked,
                                        )
                                        if (e.target.checked) {
                                            setFieldValue('minAdvanceDays', 1)
                                        } else {
                                            setFieldValue(
                                                'minAdvanceDays',
                                                undefined,
                                            )
                                        }
                                    }}
                                />
                            }
                            label="Restringir antecedência mínima"
                        />
                        {values.hasMinAdvanceDays && (
                            <NumberInput
                                label="Antecedência Mínima (opcional)"
                                error={
                                    touched.minAdvanceDays &&
                                    Boolean(errors.minAdvanceDays)
                                }
                                helperText={errors.minAdvanceDays}
                                min={1}
                                max={values.maxAdvanceDays}
                                {...getFieldProps('minAdvanceDays')}
                                onChange={(e) => {
                                    const newValue = e.target.value
                                    if (newValue === '') {
                                        setFieldValue(
                                            'minAdvanceDays',
                                            undefined,
                                        )
                                    } else {
                                        setFieldValue(
                                            'minAdvanceDays',
                                            Number(newValue),
                                        )
                                    }
                                }}
                            />
                        )}
                    </Stack>
                    <Stack width={'100%'}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={values.hasMaxAdvanceDays}
                                    onChange={(e) => {
                                        setFieldValue(
                                            'hasMaxAdvanceDays',
                                            e.target.checked,
                                        )
                                        if (e.target.checked) {
                                            setFieldValue(
                                                'maxAdvanceDays',
                                                values.minAdvanceDays || 1,
                                            )
                                        } else {
                                            setFieldValue(
                                                'maxAdvanceDays',
                                                undefined,
                                            )
                                        }
                                    }}
                                />
                            }
                            label="Restringir antecedência máxima"
                        />
                        {values.hasMaxAdvanceDays && (
                            <NumberInput
                                label="Antecedência Máxima (opcional)"
                                error={
                                    touched.maxAdvanceDays &&
                                    Boolean(errors.maxAdvanceDays)
                                }
                                helperText={errors.maxAdvanceDays}
                                min={values.minAdvanceDays || 1}
                                {...getFieldProps('maxAdvanceDays')}
                                onChange={(e) => {
                                    const newValue = e.target.value
                                    if (newValue === '') {
                                        setFieldValue(
                                            'maxAdvanceDays',
                                            undefined,
                                        )
                                    } else {
                                        setFieldValue(
                                            'maxAdvanceDays',
                                            Number(newValue),
                                        )
                                    }
                                }}
                            />
                        )}
                    </Stack>
                </Stack>
                <FormSection>
                    <FormControlLabel
                        control={<Switch checked={values.validForAbandoned} />}
                        label="Válido para reservas abandonadas"
                        onChange={(e) =>
                            setFieldValue(
                                'validForAbandoned',
                                (e.target as HTMLInputElement).checked,
                            )
                        }
                    />
                    <FormControlLabel
                        control={<Switch checked={values.validForPackages} />}
                        label="Válido para Pacotes e Feriados"
                        onChange={(e) =>
                            setFieldValue(
                                'validForPackages',
                                (e.target as HTMLInputElement).checked,
                            )
                        }
                    />
                </FormSection>
            </FormSection>

            <FormSection title="Regras de exibição">
                <FormControlLabel
                    control={<Switch checked={values.showInHighlights} />}
                    label="Exibir nos destaques do site"
                    onChange={(e) =>
                        setFieldValue(
                            'showInHighlights',
                            (e.target as HTMLInputElement).checked,
                        )
                    }
                />
                <FormControlLabel
                    control={<Switch checked={values.showDiscountTag} />}
                    label="Mostrar tag de desconto"
                    onChange={(e) =>
                        setFieldValue(
                            'showDiscountTag',
                            (e.target as HTMLInputElement).checked,
                        )
                    }
                />
            </FormSection>
        </FormContainer>
    )
}
