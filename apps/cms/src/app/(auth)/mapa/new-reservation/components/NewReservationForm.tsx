import {
    useSearchHousingUnitTypes,
    useSearchReservationOption,
    useSearchServices,
} from '@booksuite/sdk'
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    MenuItem,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { differenceInDays } from 'date-fns'
import { getIn, useFormikContext } from 'formik'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { ReservationFormData } from '../utils/config'
import { CHANNEL_OPTIONS } from '../utils/constants'

import { HousingUnitModal } from './HousingUnitModal'
import { ReservationOptionsSelector } from './ReservationOptionsSelector'
import { ServicesModal } from './ServicesModal'
import { Minus, Plus } from 'lucide-react'

interface ReservationServiceFormItem {
    serviceId: string
    qtd: number
}

export const NewReservationForm: React.FC = () => {
    const { setFieldValue, touched, errors, getFieldProps, values } =
        useFormikContext<ReservationFormData>()
    const [isHousingUnitModalOpen, setIsHousingUnitModalOpen] = useState(false)
    const [isServicesModalOpen, setIsServicesModalOpen] = useState(false)
    const companyId = useCurrentCompanyId()

    const { data: housingUnitTypes } = useSearchHousingUnitTypes(
        { companyId },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            filter: { published: true },
        },
    )

    const { data: reservationOptions } = useSearchReservationOption(
        { companyId },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            filter: {
                published: true,
                billingType: 'DAILY',
            },
        },
        undefined,
        {
            query: {
                enabled: !!(values.startDate && values.endDate),
            },
        },
    )

    const { data: services } = useSearchServices(
        { companyId },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            filter: { published: true },
        },
    )

    const selectedHousingUnit = housingUnitTypes?.items
        .flatMap((type) => type.housingUnits)
        .find((unit) => unit.id === values.housingUnitId)

    const selectedHousingUnitType = housingUnitTypes?.items.find((type) =>
        type.housingUnits.some((unit) => unit.id === values.housingUnitId),
    )

    const calculateNights = (startDate: string, endDate: string) => {
        return differenceInDays(new Date(endDate), new Date(startDate))
    }

    const calculateSubtotal = () => {
        if (!selectedHousingUnitType || !values.startDate || !values.endDate)
            return 0

        const nights = calculateNights(values.startDate, values.endDate)
        return (selectedHousingUnitType.weekdaysPrice ?? 0) * nights
    }

    const calculateTotalPrice = () => {
        if (!selectedHousingUnitType || !values.startDate || !values.endDate)
            return 0

        const nights = calculateNights(values.startDate, values.endDate)
        const basePrice = (selectedHousingUnitType.weekdaysPrice ?? 0) * nights

        const optionsTotal = values.reservationOptions.reduce(
            (total, optionId) => {
                const option = reservationOptions?.items?.find(
                    (opt) => opt.id === optionId,
                )
                if (!option) return total

                switch (option.billingType) {
                    case 'PER_GUEST_DAILY':
                        return (
                            total +
                            (option.additionalAdultPrice ?? 0) *
                                (values.adults ?? 0) *
                                nights
                        )
                    case 'PER_GUEST':
                        return (
                            total +
                            (option.additionalAdultPrice ?? 0) *
                                (values.adults ?? 0)
                        )
                    case 'DAILY':
                        return (
                            total + (option.additionalAdultPrice ?? 0) * nights
                        )
                    case 'PER_RESERVATION':
                        return total + (option.additionalAdultPrice ?? 0)
                    case 'PER_HOUSING_UNIT':
                        return total + (option.additionalAdultPrice ?? 0)
                    default:
                        return total
                }
            },
            0,
        )

        return basePrice + optionsTotal
    }

    const openHousingUnitSelector = () => {
        setIsHousingUnitModalOpen(true)
    }

    const openServicesSelector = () => {
        setIsServicesModalOpen(true)
    }

    const handleUpdateServices = (serviceId: string, quantity: number) => {
        const updatedServices = [...(values.services || [])]
        const existingServiceIndex = updatedServices.findIndex(
            (s) => s.serviceId === serviceId,
        )

        if (quantity === 0 && existingServiceIndex !== -1) {
            updatedServices.splice(existingServiceIndex, 1)
        } else if (
            existingServiceIndex !== -1 &&
            updatedServices[existingServiceIndex]
        ) {
            updatedServices[existingServiceIndex].qtd = quantity
        } else if (quantity > 0) {
            updatedServices.push({ serviceId, qtd: quantity, totalPrice: 0 })
        }

        setFieldValue('services', updatedServices)
    }

    const check = true

    return (
        <FormContainer>
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
                                fontSize: '1.25rem',
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
                        {values.housingUnitId
                            ? 'Alterar Acomodação'
                            : 'Adicionar'}
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
                                        width: 200,
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
                                                `${calculateNights(values.startDate, values.endDate).totalDays} noites`}
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

                        {reservationOptions?.totalItems && (
                            <ReservationOptionsSelector
                                startDate={values.startDate}
                                endDate={values.endDate}
                                nights={
                                    calculateNights(
                                        values.startDate,
                                        values.endDate,
                                    ).totalDays
                                }
                                housingUnitTypeId={selectedHousingUnitType?.id}
                            />
                        )}

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
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                }}
                            >
                                {formatCurrency(calculateTotalPrice())}
                            </Typography>
                        </Box>
                    </Box>
                )}
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
                        <Typography
                            variant="h6"
                            fontSize={'1rem'}
                            fontWeight={600}
                        >
                            Itens Adicionais
                        </Typography>
                    </Box>
                    <Button
                        onClick={openServicesSelector}
                        variant="contained"
                        color="primary"
                        disabled={
                            values.startDate && values.endDate ? false : true
                        }
                    >
                        Adicionar
                    </Button>
                </Grid>
                <Box>
                    {values.services?.map((service) => {
                        const serviceDetails = services?.items.find(
                            (s) => s.id === service.serviceId,
                        )
                        if (!serviceDetails) return null

                        const priceLabel =
                            serviceDetails.billingType === 'PER_GUEST'
                                ? 'por pessoa'
                                : serviceDetails.billingType === 'DAILY'
                                  ? 'por dia'
                                  : 'un'

                        const total = serviceDetails.price * service.qtd

                        return (
                            <Box
                                key={service.serviceId}
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'grey.200',
                                    borderRadius: 1,
                                    p: 3,
                                    mb: 2,
                                    bgcolor: '#FFFFFF',
                                }}
                            >
                                <Box sx={{ display: 'flex', gap: 3 }}>
                                    {serviceDetails.medias?.[0]?.media?.url && (
                                        <Box
                                            component="img"
                                            src={
                                                serviceDetails.medias[0].media
                                                    .url
                                            }
                                            alt={serviceDetails.name}
                                            sx={{
                                                width: 120,
                                                height: 90,
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
                                                mb: 1,
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontSize: '1.125rem',
                                                        fontWeight: 500,
                                                        color: '#1F2937',
                                                        mb: 1,
                                                    }}
                                                >
                                                    {serviceDetails.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: '#6B7280' }}
                                                >
                                                    {formatCurrency(
                                                        serviceDetails.price,
                                                    )}{' '}
                                                    {priceLabel}
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                }}
                                            >
                                                <Button
                                                    onClick={() =>
                                                        handleUpdateServices(
                                                            service.serviceId,
                                                            service.qtd - 1,
                                                        )
                                                    }
                                                    sx={{
                                                        minWidth: '32px',
                                                        width: '32px',
                                                        height: '32px',
                                                        p: 0,
                                                        border: '2px solid',
                                                        borderColor: 'blue.900',
                                                        borderRadius: '50%',
                                                        color: 'blue.900',
                                                        bgcolor: 'white',
                                                    }}
                                                >
                                                    <Minus size={20} />
                                                </Button>

                                                <Typography
                                                    sx={{
                                                        fontSize: '1.125rem',
                                                        fontWeight: 600,
                                                        width: '32px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {service.qtd}
                                                </Typography>
                                                <Button
                                                    onClick={() =>
                                                        handleUpdateServices(
                                                            service.serviceId,
                                                            service.qtd + 1,
                                                        )
                                                    }
                                                    sx={{
                                                        minWidth: '32px',
                                                        width: '32px',
                                                        height: '32px',
                                                        p: 0,
                                                        border: '2px solid',
                                                        borderColor: 'blue.900',
                                                        borderRadius: '50%',
                                                        color: 'blue.900',
                                                        bgcolor: 'white',
                                                    }}
                                                >
                                                    <Plus size={20} />
                                                </Button>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: 500,
                                                    color: '#6B7280',
                                                }}
                                            >
                                                Total: {formatCurrency(total)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                    {(!values.services || values.services.length === 0) && (
                        <Box
                            sx={{
                                borderRadius: 1,
                                p: 3,
                                bgcolor: '#F9FAFB',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 70,
                            }}
                        >
                            <Typography color="text.disabled">
                                Nenhum item adicionado
                            </Typography>
                        </Box>
                    )}
                    {values.services && values.services.length > 0 && (
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
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                }}
                            >
                                {formatCurrency(
                                    values.services.reduce((total, service) => {
                                        const serviceDetails =
                                            services?.items.find(
                                                (s) =>
                                                    s.id === service.serviceId,
                                            )
                                        return (
                                            total +
                                            (serviceDetails?.price || 0) *
                                                service.qtd
                                        )
                                    }, 0),
                                )}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </FormSection>

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

            <ServicesModal
                open={isServicesModalOpen}
                onClose={() => setIsServicesModalOpen(false)}
                onUpdateServices={handleUpdateServices}
                selectedServices={values.services || []}
            />

            <ServicesModal
                open={isServicesModalOpen}
                onClose={() => setIsServicesModalOpen(false)}
                onUpdateServices={handleUpdateServices}
                selectedServices={values.services || []}
            />
        </FormContainer>
    )
}
