import { Box, FormControlLabel, Grid, Switch, TextField } from '@mui/material'
import { useFormikContext } from 'formik'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { UtilityLinkData } from '../utils/config'

export const UtilityLinksForm = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [specificPeriod, setSpecificPeriod] = useState(false)

    const { getFieldProps, touched, values, errors, setFieldValue } =
        useFormikContext<UtilityLinkData>()

    useEffect(() => {
        if (!specificPeriod) {
            setFieldValue('startDate', null)
            setFieldValue('endDate', null)
        }

        if (values.startDate || values.endDate) {
            setSpecificPeriod(true)
        }
    }, [setFieldValue, specificPeriod, values, setSpecificPeriod])

    return (
        <FormContainer spacing={1}>
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
                        label="Texto do botão (CTA)"
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                        fullWidth
                        {...getFieldProps('title')}
                    />
                    <TextField
                        label="Link do botão (URL)"
                        error={touched.buttonLink && Boolean(errors.buttonLink)}
                        helperText={touched.buttonLink && errors.buttonLink}
                        fullWidth
                        {...getFieldProps('buttonLink')}
                    />
                </Box>
            </FormSection>

            <FormSection>
                <FormControlLabel
                    control={
                        <Switch
                            checked={specificPeriod}
                            onChange={(e) =>
                                setSpecificPeriod(e.target.checked)
                            }
                        />
                    }
                    label="Exibir em período especifico"
                />

                <FormSection title='Período de Exibição' hidden={!specificPeriod}>
                    <Grid size={6}>
                        <TextField
                            label="Inicio de exibição"
                            type="date"
                            fullWidth
                            value={values.startDate?.split('T').at(0)}
                            hidden={!specificPeriod}
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
                            label="Fim de exibição"
                            type="date"
                            fullWidth
                            hidden={!specificPeriod}
                            value={values.endDate?.split('T').at(0)}
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
                </FormSection>
            </FormSection>
        </FormContainer>
    )
}
