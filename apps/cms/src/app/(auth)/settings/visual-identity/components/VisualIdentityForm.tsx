'use client'

import {
    Box,
    Button,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import { useFormikContext } from 'formik'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import Settings from '../../page'
import { visualIdentityFormData } from '../utils/config'
import { OPTIONS } from '../utils/constants'

export default function VisualIdentityForm() {
    const { values, errors, setFieldValue } =
        useFormikContext<visualIdentityFormData>()

    const [logo, setLogo] = useState<string | null>(null)
    const [favicon, setFavicon] = useState<string | null>(null)
    const [mainColor, setMainColor] = useState('#714C3B')

    const logoInputRef = useRef<HTMLInputElement>(null)
    const faviconInputRef = useRef<HTMLInputElement>(null)

    const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setLogo(imageUrl)
            setFieldValue('logoFile', file)
        }
    }

    const handleFaviconChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setFavicon(imageUrl)
            setFieldValue('favIconFile', file)
        }
    }

    const openLogoSelector = () => {
        logoInputRef.current?.click()
    }

    const openFaviconSelector = () => {
        faviconInputRef.current?.click()
    }

    const [selectedType, setSelectedType] = useState<number | null>(null)

    useEffect(() => {
        setLogo(values.logo)
        setFavicon(values.favIcon)
    }, [values.favIcon, values.logo])

    return (
        <FormContainer>
            <FormSection>
                <Select
                    value={selectedType || ''}
                    onChange={(e) => setSelectedType(Number(e.target.value))}
                    displayEmpty
                    size="medium"
                >
                    <MenuItem value="" disabled>
                        Proporção da Logotipo
                    </MenuItem>
                    {OPTIONS.map(({ label }, index) => (
                        <MenuItem key={index} value={index}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormSection>

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
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Adicionar seu logotipo
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Arquivo deve ser em PNG com tamanho mínimo de 200px
                        </Typography>
                    </Box>
                    <Button
                        onClick={openLogoSelector}
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
                    {logo ? (
                        <Box
                            component="img"
                            src={logo}
                            alt="Logotipo"
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
                    ref={logoInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
            </FormSection>

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
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Adicionar seu favicon
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Arquivo deve ser em ICO com tamanho mínimo de 32px
                        </Typography>
                    </Box>
                    <Button
                        onClick={openFaviconSelector}
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
                        minHeight: 70,
                    }}
                >
                    {favicon ? (
                        <Box
                            component="img"
                            src={favicon}
                            alt="Favicon"
                            sx={{
                                width: 70,
                                height: 70,
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
                    ref={faviconInputRef}
                    onChange={handleFaviconChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
            </FormSection>

            <FormSection title="Cor principal do site">
                <Grid container alignItems="center" spacing={2} p={1}>
                    <Grid size={11}>
                        <TextField
                            label="Cor principal (HEX)"
                            value={values.settings.theme?.color}
                            fullWidth
                            onChange={(e) =>
                                setFieldValue(
                                    'settings.theme.color',
                                    e.target.value,
                                )
                            }
                        />
                    </Grid>
                    <Grid size={1}>
                        <Box
                            sx={{
                                bgcolor: mainColor,
                                borderRadius: 1,
                                width: 55,
                                height: 55,
                                ml: 1,
                            }}
                        />
                    </Grid>
                </Grid>
            </FormSection>
        </FormContainer>
    )
}
