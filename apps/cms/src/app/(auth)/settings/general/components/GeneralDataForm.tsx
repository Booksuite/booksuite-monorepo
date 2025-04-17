'use client'

import { Grid, MenuItem, TextField } from '@mui/material'
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
                        <TextField
                            select
                            label="Tipos de Negócio"
                            value={getFieldProps('type').value}
                            onChange={(e) =>
                                setFieldValue('type', e.target.value)
                            }
                        >
                            {Object.entries(COMPANY_TYPES).map(
                                ([label, value]) => (
                                    <MenuItem key={label} value={label}>
                                        {value}
                                    </MenuItem>
                                ),
                            )}
                        </TextField>
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            select
                            label="Fuso Horário"
                            value={getFieldProps('timezone').value}
                            onChange={(e) =>
                                setFieldValue('timezone', e.target.value)
                            }
                        >
                            {Object.entries(BRAZIL_TIMEZONES).map(
                                ([label, value]) => (
                                    <MenuItem key={label} value={value}>
                                        {value}
                                    </MenuItem>
                                ),
                            )}
                        </TextField>
                    </Grid>
                </Grid>
            </FormSection>
        </FormContainer>
    )
}
