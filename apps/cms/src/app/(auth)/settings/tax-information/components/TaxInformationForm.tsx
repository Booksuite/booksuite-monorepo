import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { useFormikContext } from 'formik'
import { Info } from 'lucide-react'

import { FormSection } from '@/components/atoms/FormSection'
import { TaxInformationData } from '../utils/config'
import { DOC_TYPE } from '../utils/constants'

export const TaxInformationForm = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<TaxInformationData>()

    const isCNPJ = values.docType === 'CNPJ'

    return (
        <div className="tax_information">
            <Stack gap={4}>
                <FormSection title="Dados do Responsável">
                    <TextField
                        label="Nome do Responsável"
                        fullWidth
                        error={!!errors.responsible && touched.responsible}
                        helperText={errors.responsible}
                        {...getFieldProps('responsible')}
                    />
                    <TextField
                        label="E-mail do Responsável"
                        fullWidth
                        error={
                            !!errors.responsibleEmail &&
                            touched.responsibleEmail
                        }
                        helperText={errors.responsibleEmail}
                        {...getFieldProps('responsibleEmail')}
                    />
                    <TextField
                        label="Telefone Celular"
                        fullWidth
                        error={
                            !!errors.responsiblePhone &&
                            touched.responsiblePhone
                        }
                        helperText={errors.responsiblePhone}
                        {...getFieldProps('responsiblePhone')}
                    />

                    <Box
                        bgcolor={'grey.100'}
                        p={3}
                        borderRadius={1}
                        display={'flex'}
                        alignItems={'center'}
                        width={'100%'}
                        marginTop={4}
                    >
                        <Box display="flex" alignItems="center" gap={2}>
                            <Info size={23} color={'#0B1F51'} />
                            <Typography variant="body1" color={'#0B1F51'}>
                                <b>Importante:</b> os dados do responsável pela
                                empresa não serão exibidos para o seu cliente.
                            </Typography>
                        </Box>
                    </Box>
                </FormSection>
                <FormSection title="Informações do Negócio">
                    <Grid
                        container
                        rowSpacing={4}
                        columnSpacing={{
                            xs: 1,
                            sm: 2,
                            md: 3,
                        }}
                    >
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <InputLabel>Tipo de documento</InputLabel>
                                <Select
                                    size="medium"
                                    label="Tipo de documento"
                                    onChange={(selectedOption) =>
                                        setFieldValue(
                                            'docType',
                                            selectedOption.target.value,
                                        )
                                    }
                                    value={values.docType || ''}
                                >
                                    {DOC_TYPE.map(({ value }, index) => (
                                        <MenuItem key={index} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                label={
                                    DOC_TYPE.find(
                                        (option) =>
                                            option.value === values.docType,
                                    )?.value || 'CPF'
                                }
                                fullWidth
                                error={
                                    !!errors.identification &&
                                    touched.identification
                                }
                                helperText={errors.identification}
                                {...getFieldProps('identification')}
                                onChange={handleChange('identification')}
                            />
                        </Grid>
                        {isCNPJ && (
                            <>
                                <Grid size={4}>
                                    <TextField
                                        label="Razão Social"
                                        fullWidth
                                        error={
                                            !!errors.companyName &&
                                            touched.companyName
                                        }
                                        helperText={errors.companyName}
                                        {...getFieldProps('companyName')}
                                        onChange={(e) =>
                                            setFieldValue(
                                                'companyName',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid size={4}>
                                    <TextField
                                        label="Incrição Estadual (opcional)"
                                        fullWidth
                                        error={
                                            !!errors.stateRegistration &&
                                            touched.stateRegistration
                                        }
                                        helperText={errors.stateRegistration}
                                        {...getFieldProps('stateRegistration')}
                                        onChange={handleChange(
                                            'stateRegistration',
                                        )}
                                    />
                                </Grid>
                                <Grid size={4}>
                                    <TextField
                                        label="Incrição Municipal (opcional)"
                                        fullWidth
                                        error={
                                            !!errors.municipalRegistration &&
                                            touched.municipalRegistration
                                        }
                                        helperText={
                                            errors.municipalRegistration
                                        }
                                        {...getFieldProps(
                                            'municipalRegistration',
                                        )}
                                        onChange={handleChange(
                                            'municipalRegistration',
                                        )}
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid size={8}>
                            <TextField
                                label="CEP"
                                fullWidth
                                error={!!errors.zipcode && touched.zipcode}
                                helperText={errors.zipcode}
                                {...getFieldProps('zipcode')}
                                onChange={handleChange('zipcode')}
                            />
                        </Grid>
                        <Grid size={4}>
                            <TextField
                                label="Estado"
                                fullWidth
                                error={!!errors.state && touched.state}
                                helperText={errors.state}
                                {...getFieldProps('state')}
                                onChange={handleChange('state')}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                label="Cidade"
                                fullWidth
                                error={!!errors.city && touched.city}
                                helperText={errors.city}
                                {...getFieldProps('city')}
                                onChange={handleChange('city')}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                label="País"
                                fullWidth
                                error={!!errors.country && touched.country}
                                helperText={errors.country}
                                {...getFieldProps('country')}
                                onChange={handleChange('country')}
                            />
                        </Grid>
                    </Grid>
                </FormSection>
            </Stack>
        </div>
    )
}
