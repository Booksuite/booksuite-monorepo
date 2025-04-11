import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Stack,
    Switch,
    TextField,
} from '@mui/material'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { PAY_METHODS } from '../utils/constants'

export const OffersAndCouponsForm = () => {
    const check = true

    return (
        <FormContainer>
            <FormSection>
                <TextField
                    label={'Nome da oferta'}
                    /*error={touched. && Boolean(errors.)}
                    helperText={touched. && errors.}
                    fullWidth
                    {...getFieldProps('')}*/
                />

                <TextField
                    label={'Descrição (Opcional)'}
                    rows={4}
                    multiline
                    /*error={touched. && Boolean(errors.)}
                    helperText={touched. && errors.}
                    fullWidth
                    {...getFieldProps('')}*/
                />
            </FormSection>

            <FormSection title="Períodos Válidos">
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Início da Temporada"
                            type="date"
                            /*error={touched. && Boolean(errors.)}
                            helperText={touched. && errors.}\
                            {...getFieldProps('')}*/
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="Fim da Temporada"
                            type="date"
                            /*error={touched. && Boolean(errors.)}
                            helperText={touched. && errors.}\
                            {...getFieldProps('')}*/
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </FormSection>

            <FormSection>
                <FormControlLabel
                    control={<Switch checked={check} />}
                    label="Períodos de estadia específicos?"
                    /*onChange={(e) =>
                      setFieldValue(
                          '',
                          e.target.checked,
                      )
                    }*/
                />

                {/* TODO: Períodos de estadia adicionais */}
            </FormSection>

            <FormSection title="Condições de Aplicabilidade">
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <Stack width={'100%'}>
                            <NumberInput
                                label="Estadia Mínima (opcional)"
                                fullWidth
                                /*error={!!errors.}
                                helperText={errors.}
                                {...getFieldProps('')}
                                onChange={(e) => {
                                    const newValueNumber = Number(
                                        e.target.value,
                                    )
                                    if (Number.isNaN(newValueNumber)) return
                                    setFieldValue('', newValueNumber)
                                }}*/
                            />
                        </Stack>
                    </Grid>
                    <Grid size={6}>
                        <Stack width={'100%'}>
                            <NumberInput
                                label="Estadia Máxima (opcional)"
                                /*error={!!errors.}
                                helperText={errors.}
                                {...getFieldProps('')}
                                onChange={(e) => {
                                    const newValueNumber = Number(
                                        e.target.value,
                                    )
                                    if (Number.isNaN(newValueNumber)) return
                                    setFieldValue('', newValueNumber)
                                }}*/
                            />
                        </Stack>
                    </Grid>
                    <Grid size={6}>
                        <Stack width={'100%'}>
                            <NumberInput
                                label="Antecedência Mínima (opcional)"
                                /*error={!!errors.}
                                helperText={errors.}
                                {...getFieldProps('')}
                                onChange={(e) => {
                                    const newValueNumber = Number(
                                        e.target.value,
                                    )
                                    if (Number.isNaN(newValueNumber)) return
                                    setFieldValue('', newValueNumber)
                                }}*/
                            />
                        </Stack>
                    </Grid>
                    <Grid size={6}>
                        <Stack width={'100%'}>
                            <NumberInput
                                label="Antecedência Máxima (opcional)"
                                /*error={!!errors.}
                                helperText={errors.}
                                {...getFieldProps('')}
                                onChange={(e) => {
                                    const newValueNumber = Number(
                                        e.target.value,
                                    )
                                    if (Number.isNaN(newValueNumber)) return
                                    setFieldValue('', newValueNumber)
                                }}*/
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </FormSection>

            <FormSection>
                <FormControlLabel
                    control={<Switch checked={check} />}
                    label="Válido para reservas abandonadas"
                    /*onChange={(e) =>
                      setFieldValue(
                          '',
                          e.target.checked,
                      )
                    }*/
                />
                <FormControlLabel
                    control={<Switch checked={check} />}
                    label="Válido para Pacotes e Feriados"
                    /*onChange={(e) =>
                      setFieldValue(
                          '',
                          e.target.checked,
                      )
                    }*/
                />
            </FormSection>

            {/*{!isLoadingHousingUnitTypes && !!housingUnitTypes && (
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
            )}*/}

            <FormSection title="Formas de pagamento">
                <FormControl>
                    <FormGroup>
                        <Grid container>
                            {PAY_METHODS.map((methods) => (
                                <Grid key={methods.name}>
                                    <FormControlLabel
                                        control={<Checkbox checked={check} />}
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
                        {/*<Grid container justifyContent={'space-between'}>
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
                        </Grid>*/}
                    </FormGroup>
                </FormControl>
            </FormSection>

            <FormSection title="Extras e experiências válidas"></FormSection>

            <FormSection title="Ajuste de Preço por Diária">
                {/*<FormControl fullWidth>
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
                    /> */}
            </FormSection>

            <FormSection title="Regras de exibição">
                <FormControlLabel
                    control={<Switch checked={check} />}
                    label="Exibir nos destaques do site"
                    /*onChange={(e) =>
                      setFieldValue(
                          '',
                          e.target.checked,
                      )
                    }*/
                />
                <FormControlLabel
                    control={<Switch checked={check} />}
                    label="Mostrar tag de desconto"
                    /*onChange={(e) =>
                      setFieldValue(
                          '',
                          e.target.checked,
                      )
                    }*/
                />
                <FormControlLabel
                    control={<Switch checked={check} />}
                    label="Mostrar tag de desconto"
                    /*onChange={(e) =>
                      setFieldValue(
                          '',
                          e.target.checked,
                      )
                    }*/
                />

                <TextField
                    label="Código do Cupom"
                    /*error={touched. && Boolean(errors.)}
                    helperText={touched. && errors.}\
                    {...getFieldProps('')}*/
                />
            </FormSection>
        </FormContainer>
    )
}
