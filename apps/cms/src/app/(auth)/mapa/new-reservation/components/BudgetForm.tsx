import { useGetCompanyAgePolicy } from '@booksuite/sdk'
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
import { differenceInDays } from 'date-fns'
import { FieldArray, getIn, useFormikContext } from 'formik'
import { Info, Link2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { theme } from '@/common/theme'
import { formatCurrency } from '@/common/utils/currency'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import {
    ReservationFormData,
    useCompanyHousingUnitTypes,
    useCompanyReservationOptions,
} from '../utils/config'
import { CHANNEL_OPTIONS, PAYMENT_TIME } from '../utils/constants'

import { HousingUnitModal } from './HousingUnitModal'
import { ReservationOptionsSelector } from './ReservationOptionsSelector'

export const BudgetForm: React.FC = () => {
    const { setFieldValue, touched, errors, getFieldProps, values } =
        useFormikContext<ReservationFormData>()

    const companyId = useCurrentCompanyId()
    const { data: housingUnitTypes } = useCompanyHousingUnitTypes(companyId)

    const openHousingUnitSelector = () => {
        setIsHousingUnitModalOpen(true)
    }

    const openServicesSelector = () => {
        return null
    }

    const calculateNights = (startDate: string, endDate: string) => {
        return differenceInDays(new Date(endDate), new Date(startDate))
    }

    const calculateSubtotal = () => {
        if (!selectedHousingUnitType || !values.startDate || !values.endDate)
            return 0

        const nights = calculateNights(values.startDate, values.endDate)
        return (selectedHousingUnitType.weekdaysPrice ?? 0) * nights
    }

    const selectedHousingUnit = housingUnitTypes?.items
        .flatMap((type) => type.housingUnits)
        .find((unit) => unit.id === values.housingUnitId)

    const selectedHousingUnitType = housingUnitTypes?.items.find((type) =>
        type.housingUnits.some((unit) => unit.id === values.housingUnitId),
    )

    const { data: reservationOptions } = useCompanyReservationOptions(
        companyId,
        values.startDate,
        values.endDate,
    )

    const { data: agePolicy } = useGetCompanyAgePolicy({ companyId })
    const [isHousingUnitModalOpen, setIsHousingUnitModalOpen] = useState(false)

    const calculateTotalPrice = () => {
        if (
            !selectedHousingUnitType ||
            !values.startDate ||
            !values.endDate ||
            !Array.isArray(values.reservationOptions)
        ) {
            return 0
        }

        const nights = calculateNights(values.startDate, values.endDate)
        const basePrice = (selectedHousingUnitType.weekdaysPrice ?? 0) * nights
        const adults = values.adults ?? 1

        const optionsTotal = values.reservationOptions.reduce(
            (total, optionId) => {
                const option = reservationOptions?.items?.find(
                    (opt) => opt.id === optionId,
                )
                if (!option) return total

                const price = option.additionalAdultPrice ?? 0

                switch (option.billingType) {
                    case 'PER_GUEST_DAILY':
                        return total + price * adults * nights
                    case 'PER_GUEST':
                        return total + price * adults
                    case 'DAILY':
                        return total + price * nights
                    case 'PER_RESERVATION':
                    case 'PER_HOUSING_UNIT':
                        return total + price
                    default:
                        return total
                }
            },
            0,
        )

        return basePrice + optionsTotal
    }

    useEffect(() => {
        setFieldValue(
            'children',
            agePolicy?.ageGroups.map((a) => ({
                children: 0,
                ageGroupId: a.id,
            })),
        )
    }, [agePolicy, setFieldValue])

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
                    disabled={values.startDate && values.endDate ? false : true}
                    onChange={(e) => {
                        const newValueNumber = Number(e.target.value)
                        if (Number.isNaN(newValueNumber)) return
                        setFieldValue('adults', newValueNumber)
                    }}
                />

                <FieldArray name="children">
                    {({ push, remove }) => (
                        <>
                            {agePolicy?.ageGroups.map((a, index) => (
                                <NumberInput
                                    key={index}
                                    label={`Crianças (${a.initialAge} a ${a.finalAge})`}
                                    disabled={
                                        values.startDate && values.endDate
                                            ? false
                                            : true
                                    }
                                    value={
                                        values.children
                                            ? values.children[index]?.children
                                            : 0
                                    }
                                    onChange={(e) => {
                                        setFieldValue(
                                            `children.${index}.ageGroupId`,
                                            a.id,
                                        )
                                        setFieldValue(
                                            `children.${index}.children`,
                                            e.target.value,
                                        )
                                    }}
                                />
                            ))}
                        </>
                    )}
                </FieldArray>
            </FormSection>

            <FormSection
                sx={{
                    border: '1px solid',
                    borderColor: '#E5E7EB',
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
                            sx={{
                                fontSize: '1rem',
                                fontWeight: 600,

                                mb: 0.5,
                            }}
                        >
                            Acomodação
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={openHousingUnitSelector}
                        disabled={
                            values.startDate && values.endDate ? false : true
                        }
                    >
                        Adicionar
                    </Button>
                </Grid>

                {selectedHousingUnit && selectedHousingUnitType && (
                    <Box>
                        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                            {selectedHousingUnitType.medias?.[0]?.media
                                ?.url && (
                                <Box
                                    component="img"
                                    src={
                                        selectedHousingUnitType.medias[0].media
                                            .url
                                    }
                                    alt={selectedHousingUnit?.name}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 1,
                                        objectFit: 'cover',
                                    }}
                                />
                            )}
                            <Box sx={{ flex: 1 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        mb: 2,
                                    }}
                                >
                                    <Box>
                                        <Box display={'flex'} gap={1}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 600,
                                                    mb: 1,
                                                }}
                                            >
                                                {selectedHousingUnitType.name}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 600,
                                                    mb: 1,
                                                }}
                                            >
                                                {selectedHousingUnit.name}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: '#6B7280',
                                            }}
                                        >
                                            {values.startDate &&
                                                values.endDate &&
                                                `${calculateNights(values.startDate, values.endDate)} noites`}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            color: '#6B7280',
                                        }}
                                    >
                                        Total das diárias
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {formatCurrency(calculateSubtotal())}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <ReservationOptionsSelector
                            startDate={values.startDate}
                            endDate={values.endDate}
                            nights={calculateNights(
                                values.startDate,
                                values.endDate,
                            )}
                            housingUnitTypeId={selectedHousingUnitType?.id}
                        />

                        <Box
                            sx={{
                                borderTop: '1px solid',
                                borderColor: '#E5E7EB',
                                mt: 3,
                                pt: 3,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: '1.125rem',
                                    fontWeight: 500,
                                }}
                            >
                                Sub total:
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                }}
                            >
                                {formatCurrency(calculateTotalPrice())}
                            </Typography>
                        </Box>
                    </Box>
                )}
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

            <HousingUnitModal
                open={isHousingUnitModalOpen}
                onClose={() => setIsHousingUnitModalOpen(false)}
                onSelect={(housingUnitId) =>
                    setFieldValue('housingUnitId', housingUnitId)
                }
                selectedHousingUnitId={values.housingUnitId}
                adults={values.adults ? values.adults : 0}
                childrens={
                    values.children
                        ? values.children.reduce(
                              (sum, c) => sum + Number(c.children),
                              0,
                          )
                        : 0
                }
            />

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
