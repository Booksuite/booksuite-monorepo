'use client'

import {
    useGetCompanyAgePolicy,
    useSearchHousingUnitTypes,
} from '@booksuite/sdk'
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Switch,
    TextField,
} from '@mui/material'
import { FieldArray, useFormikContext } from 'formik'
import { CirclePlus, Trash } from 'lucide-react'
import React, { useEffect } from 'react'

import {
    BILLING_TYPE_MAPPING,
    BILLING_TYPE_RESERVATION_OPTION_MAPPING,
} from '@/common/constants/billingType'
import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { VALID_NIGHTS } from '../../services/utils/constants'
import { ReservationOptionData } from '../utils/config'

export const ReservationOptionForm: React.FC = () => {
    const { getFieldProps, errors, values, touched, setFieldValue } =
        useFormikContext<ReservationOptionData>()

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

    const { data: agePolicy, isLoading } = useGetCompanyAgePolicy({
        companyId: companyId,
    })

    useEffect(() => {
        if (agePolicy?.ageGroups) {
            setFieldValue(
                'ageGroupPrices',
                agePolicy.ageGroups.map((a) => ({
                    ageGroupId: a.id,
                    price: 0,
                })),
            )
        }
    }, [agePolicy, setFieldValue])

    return (
        <FormContainer spacing={3}>
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
                        label="Nome da Tarifa"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        fullWidth
                        {...getFieldProps('name')}
                    />
                </Box>
            </FormSection>

            <FormSection title="Preço">
                <Grid size={4}>
                    <FormControl fullWidth>
                        <TextField
                            select
                            label="Tipo de Cobrança"
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            fullWidth
                            {...getFieldProps('billingType')}
                        >
                            {Object.entries(BILLING_TYPE_RESERVATION_OPTION_MAPPING).map(
                                ([key, value]) => (
                                    <MenuItem key={key} value={key}>
                                        {value}
                                    </MenuItem>
                                ),
                            )}
                        </TextField>
                    </FormControl>
                </Grid>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <TextField
                        label="Valor Adicional (por adulto)"
                        type="number"
                        error={
                            touched.additionalAdultPrice &&
                            Boolean(errors.additionalAdultPrice)
                        }
                        helperText={
                            touched.additionalAdultPrice &&
                            errors.additionalAdultPrice
                        }
                        fullWidth
                        {...getFieldProps('additionalAdultPrice')}
                    />
                    <TextField
                        label="Valor Adicional (por criança)"
                        type="number"
                        error={
                            touched.additionalChildrenPrice &&
                            Boolean(errors.additionalChildrenPrice)
                        }
                        helperText={
                            touched.additionalChildrenPrice &&
                            errors.additionalChildrenPrice
                        }
                        fullWidth
                        {...getFieldProps('additionalChildrenPrice')}
                    />
                </Box>
                <FieldArray name="ageGroupPrices">
                    {({}) => (
                        <Box>
                            {agePolicy?.ageGroups?.map((a, index) => {
                                const error =
                                    typeof errors.ageGroupPrices?.[index] ===
                                    'object'
                                        ? errors.ageGroupPrices[index]
                                        : undefined

                                return (
                                    <FormSection key={index}>
                                        <Box key={index}>
                                            <TextField
                                                key={index}
                                                label={`Valor adicional (faixa etária ${a.initialAge}-${a.finalAge})`}
                                                type="number"
                                                error={
                                                    touched.additionalChildrenPrice &&
                                                    Boolean(
                                                        errors.additionalChildrenPrice,
                                                    )
                                                }
                                                helperText={
                                                    touched.additionalChildrenPrice &&
                                                    errors.additionalChildrenPrice
                                                }
                                                fullWidth
                                                {...getFieldProps(
                                                    `ageGroupPrices.${index}.price`,
                                                )}
                                            />
                                        </Box>
                                    </FormSection>
                                )
                            })}
                        </Box>
                    )}
                </FieldArray>
            </FormSection>

            <FormSection title="Items Inclusos">
                <FieldArray name="includedItems">
                    {({ push, remove }) => (
                        <Box>
                            {values.includedItems.map((a, index) => {
                                const error =
                                    typeof errors.includedItems?.[index] ===
                                    'object'
                                        ? errors.includedItems[index]
                                        : undefined

                                return (
                                    <FormSection key={index}>
                                        <Box key={index} display={'flex'}>
                                            <TextField
                                                key={index}
                                                label="Item Incluso"
                                                type="text"
                                                error={
                                                    touched.includedItems &&
                                                    Boolean(
                                                        errors.includedItems,
                                                    )
                                                }
                                                helperText={
                                                    touched.includedItems &&
                                                    errors.includedItems
                                                }
                                                fullWidth
                                                {...getFieldProps(
                                                    `includedItems.${index}`,
                                                )}
                                            />

                                            <IconButton
                                                onClick={() => remove(index)}
                                                aria-label="Remove"
                                                color="error"
                                            >
                                                <Trash />
                                            </IconButton>
                                        </Box>
                                    </FormSection>
                                )
                            })}
                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<CirclePlus size={16} />}
                                sx={{ mt: 2, mb: 2 }}
                                size="large"
                                onClick={() => push('')}
                            >
                                Adicionar Item
                            </Button>
                        </Box>
                    )}
                </FieldArray>
            </FormSection>

            {!isLoadingHousingUnitTypes && !!housingUnitTypes && (
                <FormSection title="Acomodações Válidas">
                    <FormControl component="fieldset">
                        <FormGroup>
                            {housingUnitTypes.items?.map((housing) => (
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
                                                checked={values.availableWeekend.includes(
                                                    night.value,
                                                )}
                                                onChange={(e) => {
                                                    const newValue = e.target
                                                        .checked
                                                        ? [
                                                              ...values.availableWeekend,
                                                              night.value,
                                                          ]
                                                        : values.availableWeekend.filter(
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
        </FormContainer>
    )
}
