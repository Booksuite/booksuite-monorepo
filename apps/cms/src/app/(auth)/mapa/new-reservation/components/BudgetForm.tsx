import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    InputAdornment,
    MenuItem,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { getIn, useFormikContext } from 'formik'
import { Info, Link2 } from 'lucide-react'

import { theme } from '@/common/theme'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { ReservationFormData } from '../utils/config'
import { CHANNEL_OPTIONS, PAYMENT_TIME } from '../utils/constants'

export const BudgetForm: React.FC = () => {
    const { setFieldValue, touched, errors, getFieldProps, values } =
        useFormikContext<ReservationFormData>()

    const openHousingUnitSelector = () => {
        return null
    }

    const openServicesSelector = () => {
        return null
    }

    const check = true

    return (
        <FormContainer>
            <FormSection>
                <TextField
                    select
                    label="Pagamento expira em"
                    // value={values.}
                    // onChange={(e) =>
                    //     setFieldValue('', e.target.value)
                    // }
                >
                    {PAYMENT_TIME.map(({ label, value }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </TextField>

                <Box
                    bgcolor={'grey.100'}
                    p={4}
                    borderRadius={1}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <Info color={theme.palette.blue[900]} />
                        <Typography variant="body1" color={'blue.900'}>
                            <b>Atenção:</b> o orçamento não garantirá valores e
                            disponibilidades para o cliente, pois não ocupará
                            vaga no mapa de reservas.
                        </Typography>
                    </Box>
                </Box>
            </FormSection>

            <FormSection title="Informações do hóspede">
                <TextField
                    label="Nome Completo"
                    fullWidth
                    {...getFieldProps('guestUser.firstName')}
                    error={Boolean(
                        getIn(touched, 'guestUser.firstName') &&
                            getIn(errors, 'guestUser.firstName'),
                    )}
                    helperText={
                        getIn(touched, 'guestUser.firstName') &&
                        getIn(errors, 'guestUser.firstName')
                    }
                />

                <TextField
                    label="E-mail"
                    fullWidth
                    {...getFieldProps('guestUser.email')}
                    error={
                        Boolean(getIn(touched, 'guestUser.email')) &&
                        Boolean(getIn(errors, 'guestUser.email'))
                    }
                    helperText={
                        getIn(touched, 'guestUser.email') &&
                        getIn(errors, 'guestUser.email')
                    }
                />

                <TextField
                    label="Telefone/WhatsApp com DDD"
                    fullWidth
                    {...getFieldProps('guestUser.phone')}
                    error={
                        Boolean(getIn(touched, 'guestUser.phone')) &&
                        Boolean(getIn(errors, 'guestUser.phone'))
                    }
                    helperText={
                        getIn(touched, 'guestUser.phone') &&
                        getIn(errors, 'guestUser.phone')
                    }
                />
            </FormSection>

            <FormSection title="Detalhes da reserva">
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Início da Estadia"
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
                            label="Fim da Estadia"
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

                <NumberInput
                    label="Adultos"
                    value={values.adults}
                    onChange={(e) => {
                        const newValueNumber = Number(e.target.value)
                        if (Number.isNaN(newValueNumber)) return
                        setFieldValue('adults', newValueNumber)
                    }}
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
                            Acomodação
                        </Typography>
                    </Box>
                    <Button
                        onClick={openHousingUnitSelector}
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
                    {values.housingUnitId ? (
                        <Box>
                            <Typography color="text.disabled">Lista</Typography>
                        </Box>
                    ) : (
                        <Typography color="text.disabled">
                            Nenhuma acomodação adicionada
                        </Typography>
                    )}
                </Box>
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
                            Itens Adicionais
                        </Typography>
                    </Box>
                    <Button
                        onClick={openServicesSelector}
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
                    {values.services ? (
                        <Box>
                            <Typography color="text.disabled">Lista</Typography>
                        </Box>
                    ) : (
                        <Typography color="text.disabled">
                            Nenhuma item adicionado
                        </Typography>
                    )}
                </Box>
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
                            Acomodação
                        </Typography>
                    </Box>
                    <Button
                        onClick={openHousingUnitSelector}
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
                    {values.housingUnitId ? (
                        <Box
                            component="img"
                            src={values.housingUnitId}
                            sx={{
                                width: 70,
                                height: 70,
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <Typography color="text.disabled">
                            Nenhuma acomodação adicionada
                        </Typography>
                    )}
                </Box>
            </FormSection>

            {/* <FormSection
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
                            Transações
                        </Typography>
                    </Box>
                    <Button
                        onClick={openHousingUnitSelector}
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
                    {values. ? (
                        <Box
                            component="img"
                            src={values.}
                            sx={{
                                width: 70,
                                height: 70,
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <Typography color="text.disabled">
                            Nenhuma transação adicionada
                        </Typography>
                    )}
                </Box>
            </FormSection> */}

            <FormSection title="Detalhes adicionais">
                <TextField
                    select
                    label="Canal de Venda"
                    value={values.saleChannel}
                    onChange={(e) =>
                        setFieldValue('saleChannel', e.target.value)
                    }
                >
                    {CHANNEL_OPTIONS.map(({ label, value }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Vendedor"
                    fullWidth
                    {...getFieldProps('sellerUser.firstName')}
                    error={Boolean(
                        getIn(touched, 'sellerUser.firstName') &&
                            getIn(errors, 'sellerUser.firstName'),
                    )}
                    helperText={
                        getIn(touched, 'sellerUser.firstName') &&
                        getIn(errors, 'sellerUser.firstName')
                    }
                />

                <TextField
                    rows={4}
                    multiline
                    label="Observações (uso interno)"
                    error={touched.notes && Boolean(errors.notes)}
                    helperText={touched.notes && errors.notes}
                    fullWidth
                    {...getFieldProps('notes')}
                />
            </FormSection>

            <FormSection title="Enviar para o hóspede">
                <FormControlLabel
                    control={
                        <Switch
                            checked={check}
                            onChange={(e) =>
                                setFieldValue('', e.target.checked)
                            }
                        />
                    }
                    label="Publicado"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={check}
                            onChange={(e) =>
                                setFieldValue('', e.target.checked)
                            }
                        />
                    }
                    label="Publicado"
                />
            </FormSection>

            <TextField
                label="Link da pré-reserva"
                fullWidth
                // error={touched. && Boolean(errors.)}
                // helperText={touched. && errors.}
                // {...getFieldProps('')}
                disabled
                InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <Link2 />
                        </InputAdornment>
                    ),
                }}
            />
        </FormContainer>
    )
}
