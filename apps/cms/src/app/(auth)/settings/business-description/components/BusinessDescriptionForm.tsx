import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    useTheme,
} from '@mui/material'
import { useFormikContext } from 'formik'
import { Info } from 'lucide-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { BusinessDescriptionFormData } from '../utils/config'

export const BusinessDescriptionForm = () => {
    const theme = useTheme()
    const {
        getFieldProps,
        errors,
        touched,
        handleChange,
        values,
        setFieldValue,
    } = useFormikContext<BusinessDescriptionFormData>()

    const [banner, setbanner] = useState<string | null>(null)
    const bannerInputRef = useRef<HTMLInputElement>(null)

    const handlebannerChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setbanner(imageUrl)
            setFieldValue('bannerFile', file)
        }
    }

    const openbannerSelector = () => {
        bannerInputRef.current?.click()
    }

    useEffect(() => {
        setbanner(values.bannerImage?.url || '')
    }, [values])

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
                    <FormSection
                        sx={{
                            border: '1px solid',
                            borderColor: 'divider',
                            p: 3,
                            borderRadius: 1,
                        }}
                    >
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    gutterBottom
                                >
                                    Adicionar seu Banner
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Arquivo deve ser em PNG com tamanho mínimo
                                    de 200px
                                </Typography>
                            </Box>
                            <Button
                                onClick={openbannerSelector}
                                variant="contained"
                                color="primary"
                            >
                                Adicionar
                            </Button>
                        </Grid>

                        <Box
                            sx={{
                                borderRadius: 1,
                                p: 3,
                                bgcolor: 'grey.100',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 120,
                            }}
                        >
                            {banner ? (
                                <Box
                                    component="img"
                                    src={banner}
                                    alt="bannertipo"
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : (
                                <Typography color="text.disabled">
                                    Nenhuma imagem selecionada
                                </Typography>
                            )}
                        </Box>

                        <input
                            type="file"
                            ref={bannerInputRef}
                            onChange={handlebannerChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </FormSection>
                </Box>

                <FormSection>
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
                                1. A imagem será exibida quando você
                                compartilhar o site em alguma rede social ou
                                aplicativo de mensagens.
                                <br />
                                <br />
                                2. A imagem será utilizada no banner principal
                                do site quando não houver nenhum banner
                                específico cadastrado no menu marketing/banners.
                            </Typography>
                        </Box>
                    </Box>
                </FormSection>

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
