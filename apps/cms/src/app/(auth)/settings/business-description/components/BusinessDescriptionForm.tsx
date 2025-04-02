import { Box, TextField, Typography, useTheme } from '@mui/material'
import { useFormikContext } from 'formik'
import { Info } from 'lucide-react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { BusinessDescriptionFormData } from '../utils/config'

export const BusinessDescriptionForm = () => {
    const theme = useTheme()
    const { getFieldProps, errors, touched, handleChange } =
        useFormikContext<BusinessDescriptionFormData>()

    return (
        <FormContainer>
            <FormSection>
                <TextField
                    label="Nome da Propriedade"
                    disabled
                    fullWidth
                    {...getFieldProps('name')}
                />

                <TextField
                    label="Descrição Curta"
                    multiline
                    rows={4}
                    fullWidth
                    error={
                        touched.shortDescription &&
                        Boolean(errors.shortDescription)
                    }
                    helperText={
                        touched.shortDescription && errors.shortDescription
                    }
                    {...getFieldProps('shortDescription')}
                />

                <TextField
                    label="Descrição Longa - Sobre Nós"
                    multiline
                    rows={6}
                    fullWidth
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    {...getFieldProps('description')}
                />
            </FormSection>

            <FormSection title="Banner de compartilhamento">
                <Box
                    bgcolor="grey.100"
                    p={4}
                    borderRadius={1}
                    display="flex"
                    alignItems="center"
                >
                    <Box display="flex" alignItems="center" gap={4}>
                        <Info color={theme.palette.blue[900]} />
                        <Typography variant="body2" color="blue.900">
                            1. A imagem será exibida quando você compartilhar o
                            site em alguma rede social ou aplicativo de
                            mensagens.
                            <br />
                            <br />
                            2. A imagem será utilizada no banner principal do
                            site quando não houver nenhum banner específico
                            cadastrado no menu marketing/banners.
                        </Typography>
                    </Box>
                </Box>

                <FormSection title="Informações do Banner - página inicial">
                    <TextField
                        label="Título Principal"
                        fullWidth
                        error={
                            touched.bannerTitle && Boolean(errors.bannerTitle)
                        }
                        helperText={touched.bannerTitle && errors.bannerTitle}
                        {...getFieldProps('bannerTitle')}
                        onChange={handleChange('bannerTitle')}
                    />

                    <TextField
                        label="Descrição de Apoio (opcional)"
                        fullWidth
                        error={
                            touched.bannerDescription &&
                            Boolean(errors.bannerDescription)
                        }
                        helperText={
                            touched.bannerDescription &&
                            errors.bannerDescription
                        }
                        {...getFieldProps('bannerDescription')}
                        onChange={handleChange('bannerDescription')}
                    />
                </FormSection>
            </FormSection>
        </FormContainer>
    )
}
