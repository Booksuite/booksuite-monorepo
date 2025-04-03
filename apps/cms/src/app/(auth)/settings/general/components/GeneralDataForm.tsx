'use client'

import { Grid, MenuItem, Select, TextField } from '@mui/material'
import { useFormikContext } from 'formik'
import React from 'react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { GeneralDataForm } from '../utils/config'
import { BRAZIL_TIMEZONES, COMPANY_TYPES } from '../utils/constants'

export const GeneralForm: React.FC = () => {
    const { getFieldProps, setFieldValue } = useFormikContext<GeneralDataForm>()

    return (
        <FormContainer>
            <FormSection>
                <TextField
                    label="Nome da Propriedade"
                    fullWidth
                    {...getFieldProps('name')}
                />

                <Grid container spacing={2}>
                    <Grid size={6}>
                        <Select
                            value={getFieldProps('type').value}
                            fullWidth
                            onChange={(selectedOption) =>
                                setFieldValue(
                                    'type',
                                    selectedOption.target.value,
                                )
                            }
                        >
                            {Object.entries(COMPANY_TYPES).map(
                                ([value, label]) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ),
                            )}
                        </Select>
                    </Grid>
                    <Grid size={6}>
                        <Select
                            value={getFieldProps('timezone').value}
                            fullWidth
                            onChange={(selectedOption) => {
                                setFieldValue(
                                    'timezone',
                                    selectedOption.target.value,
                                )
                            }}
                        >
                            {Object.entries(BRAZIL_TIMEZONES).map(
                                ([label, value]) => (
                                    <MenuItem key={label} value={value}>
                                        {value}
                                    </MenuItem>
                                ),
                            )}
                        </Select>
                    </Grid>
                </Grid>
            </FormSection>
        </FormContainer>
    )
}
