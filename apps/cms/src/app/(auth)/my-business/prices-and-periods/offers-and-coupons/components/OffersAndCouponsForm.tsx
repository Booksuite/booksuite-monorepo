import { HousingUnitTypeFull, useSearchServices } from '@booksuite/sdk'
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
    PAY_METHODS,
    PRICE_VARIATION_TYPE,
    VALID_NIGHTS,
} from '../utils/constants'

interface OffersAndCouponsFormProps {
    availableHousingUnitTypes?: HousingUnitTypeFull[]
}

export const OffersAndCouponsForm = ({
    availableHousingUnitTypes,
}: OffersAndCouponsFormProps) => {
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

    return (
        <FormContainer>
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
            </FormSection>

            <FormSection title="Períodos Válidos">
                <FormSection title="Períodos de compra">
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField
                                label="Início do período de compra"
                                type="date"
                                error={
                                    touched.purchaseStartDate &&
                                    Boolean(errors.purchaseStartDate)
                                }
                                helperText={
                                    touched.purchaseStartDate &&
                                    errors.purchaseStartDate
                                }
                                {...getFieldProps('purchaseStartDate')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                label="Fim do período de compra"
                                type="date"
                                error={
                                    touched.purchaseEndDate &&
                                    Boolean(errors.purchaseEndDate)
                                }
                                helperText={
                                    touched.purchaseEndDate &&
                                    errors.purchaseEndDate
                                }
                                {...getFieldProps('purchaseEndDate')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </FormSection>

                <FormSection title="Períodos de estadia">
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField
                                label="Início do período de estadia"
                                type="date"
                                error={
                                    touched.validStartDate &&
                                    Boolean(errors.validStartDate)
                                }
                                helperText={
                                    touched.validStartDate &&
                                    errors.validStartDate
                                }
                                {...getFieldProps('validStartDate')}
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
                                    touched.validEndDate &&
                                    Boolean(errors.validEndDate)
                                }
                                helperText={
                                    touched.validEndDate && errors.validEndDate
                                }
                                {...getFieldProps('validEndDate')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </FormSection>
            </FormSection>

            <FormSection title="Condições de Aplicabilidade">
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <Stack width={'100%'}>
                            <NumberInput
                                label="Estadia Mínima (opcional)"
                                min={0}
                                error={
                                    touched.minDays && Boolean(errors.minDays)
                                }
                                {...getFieldProps('minDays')}
                                onChange={(e) => {
                                    const newValueNumber = Number(
                                        e.target.value,
                                    )
                                    if (Number.isNaN(newValueNumber)) return
                                    setFieldValue('minDays', newValueNumber)
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid size={6}>
                        <Stack width={'100%'}>
                            <NumberInput
                                label="Estadia Máxima (opcional)"
                                min={0}
                                error={
                                    touched.maxDays && Boolean(errors.maxDays)
                                }
                                {...getFieldProps('maxDays')}
                                onChange={(e) => {
                                    const newValueNumber = Number(
                                        e.target.value,
                                    )
                                    if (Number.isNaN(newValueNumber)) return
                                    setFieldValue('maxDays', newValueNumber)
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid size={6}>
                        <Stack width={'100%'}>
                            <NumberInput
                                label="Antecedência Mínima (opcional)"
                                min={0}
                                error={
                                    touched.minAdvanceDays &&
                                    Boolean(errors.minAdvanceDays)
                                }
                                {...getFieldProps('minAdvanceDays')}
                                onChange={(e) => {
                                    const newValueNumber = Number(
                                        e.target.value,
                                    )
                                    if (Number.isNaN(newValueNumber)) return
                                    setFieldValue(
                                        'minAdvanceDays',
                                        newValueNumber,
                                    )
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid size={6}>
                        <Stack width={'100%'}>
                            <NumberInput
                                label="Antecedência Máxima (opcional)"
                                min={0}
                                error={
                                    touched.maxAdvanceDays &&
                                    Boolean(errors.maxAdvanceDays)
                                }
                                {...getFieldProps('maxAdvanceDays')}
                                onChange={(e) => {
                                    const newValueNumber = Number(
                                        e.target.value,
                                    )
                                    if (Number.isNaN(newValueNumber)) return
                                    setFieldValue(
                                        'maxAdvanceDays',
                                        newValueNumber,
                                    )
                                }}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </FormSection>

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

            <FormSection title="Ajuste de Preço por Diária">
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

            <FormSection title="Acomodações Válidas">
                <FormControl component="fieldset">
                    <Grid container spacing={2}>
                        <Grid size={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            values.availableHousingUnitTypes
                                                .length ===
                                            availableHousingUnitTypes?.length
                                        }
                                        indeterminate={
                                            availableHousingUnitTypes !==
                                                undefined &&
                                            values.availableHousingUnitTypes
                                                .length > 0 &&
                                            values.availableHousingUnitTypes
                                                .length <
                                                availableHousingUnitTypes.length
                                        }
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                const allSelected =
                                                    availableHousingUnitTypes?.map(
                                                        (housing) => ({
                                                            housingUnitType: {
                                                                id: housing.id,
                                                                name: housing.name,
                                                                weekdaysPrice:
                                                                    housing.weekdaysPrice,
                                                                weekendPrice:
                                                                    housing.weekendPrice,
                                                            },
                                                            baseWeekPrice:
                                                                housing.weekdaysPrice ||
                                                                0,
                                                            newWeekPrice: 0,
                                                            weekendBasePrice:
                                                                housing.weekendPrice ||
                                                                0,
                                                            weekendNewPrice: 0,
                                                            id: '',
                                                            seasonRuleId: '',
                                                        }),
                                                    ) || []
                                                setFieldValue(
                                                    'availableHousingUnitTypes',
                                                    allSelected,
                                                )
                                            } else {
                                                setFieldValue(
                                                    'availableHousingUnitTypes',
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
                                values.availableHousingUnitTypes.some(
                                    (h) => h.housingUnitType.id === housing.id,
                                )

                            return (
                                <Grid size={3} key={housing.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={exists}
                                                onChange={(e) => {
                                                    const updated = [
                                                        ...values.availableHousingUnitTypes,
                                                    ]

                                                    if (e.target.checked) {
                                                        updated.push({
                                                            housingUnitType: {
                                                                id: housing.id,
                                                                name: housing.name,
                                                                weekdaysPrice:
                                                                    housing.weekdaysPrice,
                                                                weekendPrice:
                                                                    housing.weekendPrice,
                                                            },
                                                            baseWeekPrice:
                                                                housing.weekdaysPrice ||
                                                                0,
                                                            newWeekPrice: 0,
                                                            weekendBasePrice:
                                                                housing.weekendPrice ||
                                                                0,
                                                            weekendNewPrice: 0,
                                                            id: '',
                                                            seasonRuleId: '',
                                                        })
                                                        setFieldValue(
                                                            'availableHousingUnitTypes',
                                                            updated,
                                                        )
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
                                                            'availableHousingUnitTypes',
                                                            filtered,
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

            <FormSection title="Itens Válidos">
                <FormControl component="fieldset">
                    <Grid container spacing={2}>
                        <Grid size={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            values.validServices.length ===
                                            serviceItems.length
                                        }
                                        indeterminate={
                                            serviceItems.length > 0 &&
                                            values.validServices.length > 0 &&
                                            values.validServices.length <
                                                serviceItems.length
                                        }
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFieldValue(
                                                    'validServices',
                                                    serviceItems.map(
                                                        (s) => s.id,
                                                    ),
                                                )
                                            } else {
                                                setFieldValue(
                                                    'validServices',
                                                    [],
                                                )
                                            }
                                        }}
                                    />
                                }
                                label="Selecionar Todos"
                            />
                        </Grid>

                        {serviceItems.map((service) => {
                            const exists = values.validServices.includes(
                                service.id,
                            )

                            return (
                                <Grid size={3} key={service.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={exists}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFieldValue(
                                                            'validServices',
                                                            [
                                                                ...values.validServices,
                                                                service.id,
                                                            ],
                                                        )
                                                    } else {
                                                        setFieldValue(
                                                            'validServices',
                                                            values.validServices.filter(
                                                                (id) =>
                                                                    id !==
                                                                    service.id,
                                                            ),
                                                        )
                                                    }
                                                }}
                                            />
                                        }
                                        label={service.name}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </FormControl>
            </FormSection>

            <FormSection title="Formas de pagamento">
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
            </FormSection>

            <FormSection title="Noites válidas">
                <FormControl>
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
                                                        Number(night.value),
                                                    )
                                                }
                                                onChange={(e) => {
                                                    const newValue = e.target
                                                        .checked
                                                        ? [
                                                              ...(values.availableWeekDays ||
                                                                  []),
                                                              Number(
                                                                  night.value,
                                                              ),
                                                          ]
                                                        : (
                                                              values.availableWeekDays ||
                                                              []
                                                          ).filter(
                                                              (v) =>
                                                                  v !==
                                                                  Number(
                                                                      night.value,
                                                                  ),
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
                <FormControlLabel
                    control={<Switch checked={values.isExclusive} />}
                    label="Exclusivo para reservas"
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
                />
            </FormSection>
        </FormContainer>
    )
}
