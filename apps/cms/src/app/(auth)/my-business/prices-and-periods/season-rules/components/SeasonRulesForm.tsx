import { useSearchHousingUnitTypes } from '@booksuite/sdk'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
} from '@mui/material'
import { useFormikContext } from 'formik'

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
                            {availableHousingUnitTypes?.map((housing) => (
                                <Grid size={3} key={housing.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.housingUnitTypePrices?.some(
                                                    (h) =>
                                                        h.housingUnitTypeId ===
                                                        housing.id,
                                                )}
                                                onChange={(e) => {
                                                    const newValue = e.target
                                                        .checked
                                                        ? [
                                                              ...(values.housingUnitTypePrices ||
                                                                  []),
                                                              {
                                                                  housingUnitTypeId:
                                                                      housing.id,
                                                                  priceVariation:
                                                                      values.price ||
                                                                      0,
                                                              },
                                                          ]
                                                        : values.housingUnitTypePrices?.filter(
                                                              (h) =>
                                                                  h.housingUnitTypeId !==
                                                                  housing.id,
                                                          ) || []

                                                    setFieldValue(
                                                        'housingUnitTypePrices',
                                                        newValue,
                                                    )
                                                }}
                                            />
                                        }
                                        label={housing.name}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </FormControl>
                </FormSection>
            )}

            <FormSection title="Ajuste de Preço por Diária">
                <FormControl fullWidth>
                    <Select
                        value={values.priceVariationType}
                        onChange={(e) =>
                            setFieldValue('priceVariationType', e.target.value)
                        }
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Selecione um tipo de cobrança
                        </MenuItem>
                        {PRICE_VARIATION_TYPE.map(({ label, value }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Variação de Preço Geral"
                    type="number"
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                    fullWidth
                    value={values.price || ''}
                    onChange={(e) => {
                        let newValue = e.target.value
                        if (
                            values.priceVariationType ===
                                'PERCENTAGE_INCREASE' ||
                            values.priceVariationType === 'PERCENTAGE_REDUCTION'
                        ) {
                            newValue = Math.max(
                                0,
                                Math.min(100, Number(newValue)),
                            )
                        }
                        setFieldValue('price', newValue)
                    }}
                    InputProps={{
                        endAdornment:
                            values.priceVariationType ===
                                'PERCENTAGE_INCREASE' ||
                            values.priceVariationType === 'PERCENTAGE_REDUCTION'
                                ? '%'
                                : '',
                    }}
                />
            </FormSection>
        </FormContainer>
    )
}
