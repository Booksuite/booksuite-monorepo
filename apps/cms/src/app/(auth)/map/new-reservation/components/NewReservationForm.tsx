import { useGetCompanyAgePolicy, useSearchRateOption } from '@booksuite/sdk'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { getIn, useFormikContext } from 'formik'
import { Minus, Plus } from 'lucide-react'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import {
    ReservationFormData,
    useCompanyHousingUnitTypes,
    useCompanyServices,
} from '../utils/config'

import { HousingUnitModal } from './HousingUnitModal'
import { RateOptionsSelector } from './RateOptionsSelector'
import { ServicesModal } from './ServicesModal'

export const NewReservationForm: React.FC = () => {
    const { setFieldValue, errors, values, getFieldProps, touched } =
        useFormikContext<ReservationFormData>()
    const [isHousingUnitModalOpen, setIsHousingUnitModalOpen] = useState(false)
    const [isServicesModalOpen, setIsServicesModalOpen] = useState(false)
    const companyId = useCurrentCompanyId()

    const { data: agePolicy } = useGetCompanyAgePolicy({ companyId })

    const { data: housingUnitTypes } = useCompanyHousingUnitTypes(companyId)

    const { data: reservationOptions } = useSearchRateOption(
        {
            companyId,
        },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            filter: {
                published: true,
            },
        },
    )

    const { data: services } = useCompanyServices(
        companyId,
        isServicesModalOpen,
    )

    const selectedHousingUnit = housingUnitTypes?.items
        .flatMap((type) => type.housingUnits)
        .find((unit) => unit.id === values.housingUnitId)

    const selectedHousingUnitType = housingUnitTypes?.items.find((type) =>
        type.housingUnits.some((unit) => unit.id === values.housingUnitId),
    )

    const openHousingUnitSelector = () => {
        setIsHousingUnitModalOpen(true)
    }

    const openServicesSelector = () => {
        setIsServicesModalOpen(true)
    }

    const handleUpdateServices = (serviceId: string, quantity: number) => {
        const updatedServices = [...(values.services || [])]
        const existingServiceIndex =
            services?.items.findIndex((s) => s.id === serviceId) || 0

        if (
            existingServiceIndex !== -1 &&
            updatedServices[existingServiceIndex]
        ) {
            updatedServices[existingServiceIndex].quantity = quantity
            updatedServices[existingServiceIndex].totalPrice = services?.items[
                existingServiceIndex
            ]?.price
                ? services?.items[existingServiceIndex]?.price * quantity
                : 0
        } else if (quantity > 0) {
            updatedServices.push({
                serviceId,
                quantity: quantity,
                totalPrice: 0,
            })
        }
        setFieldValue('services', updatedServices)

        const additionsTotal = values.services.reduce((total, service) => {
            const serviceDetails = services?.items.find(
                (s) => s.id === service.serviceId,
            )
            return total + (serviceDetails?.price || 0) * service.quantity
        }, 0)

        setFieldValue('summary.additionalTotal', additionsTotal)
    }

    useEffect(() => {
        if (values.ageGroups.length || !agePolicy?.ageGroups.length) return
        setFieldValue(
            'ageGroups',
            agePolicy?.ageGroups.map((policyAgeGroup) => ({
                quantity: 0,
                ageGroupId: policyAgeGroup.id,
            })),
        )
    }, [agePolicy, services?.items, setFieldValue, values])

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
                    min={0}
                    disabled={values.startDate && values.endDate ? false : true}
                    onChange={(e) => {
                        const newValueNumber = Number(e.target.value)
                        if (Number.isNaN(newValueNumber)) return
                        setFieldValue('adults', newValueNumber)
                    }}
                />

                {agePolicy?.ageGroups.map((policyAgeGroup, index) => (
                    <NumberInput
                        key={policyAgeGroup.id}
                        min={0}
                        label={`Crianças (${policyAgeGroup.initialAge} a ${policyAgeGroup.finalAge})`}
                        disabled={
                            values.startDate && values.endDate ? false : true
                        }
                        value={
                            values.ageGroups
                                ? values.ageGroups[index]?.quantity
                                : 0
                        }
                        onChange={(e) => {
                            setFieldValue(
                                `ageGroups.${index}.quantity`,
                                Number(e.target.value),
                            )
                        }}
                    />
                ))}
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
                        {values.housingUnitId
                            ? 'Alterar Acomodação'
                            : 'Adicionar'}
                    </Button>
                </Grid>

                {selectedHousingUnit &&
                    selectedHousingUnitType &&
                    !isHousingUnitModalOpen && (
                        <Box>
                            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                                {selectedHousingUnitType.medias?.[0]?.media
                                    ?.url && (
                                    <Box
                                        component="img"
                                        src={
                                            selectedHousingUnitType.medias[0]
                                                .media.url
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
                                                    {
                                                        selectedHousingUnitType.name
                                                    }
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
                                                {`${moment(values.endDate).diff(
                                                    moment(values.startDate),
                                                    'days',
                                                )} Noites`}
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
                                                fontSize: '1.2rem',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {formatCurrency(values.finalPrice)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {reservationOptions?.items.length &&
                            reservationOptions.items.length > 0
                                ? reservationOptions?.totalItems && (
                                      <RateOptionsSelector
                                          startDate={values.startDate}
                                          endDate={values.endDate}
                                          nights={moment(values.endDate).diff(
                                              moment(values.startDate),
                                              'days',
                                          )}
                                          housingUnitTypeId={
                                              selectedHousingUnitType?.id
                                          }
                                          reservationOptions={
                                              reservationOptions.items
                                          }
                                          adults={values.adults}
                                          childrens={values.ageGroups}
                                      />
                                  )
                                : undefined}

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
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    Sub total:
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    {formatCurrency(
                                        values.finalPrice +
                                            values.summary.rateOption.price,
                                    )}
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
                {!isServicesModalOpen && (
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

                            const total =
                                serviceDetails.price * service.quantity

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
                                        {serviceDetails.medias?.[0]?.media
                                            ?.url && (
                                            <Box
                                                component="img"
                                                src={
                                                    serviceDetails.medias[0]
                                                        .media.url
                                                }
                                                alt={serviceDetails.name}
                                                sx={{
                                                    width: 90,
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
                                                    justifyContent:
                                                        'space-between',
                                                    mb: 1,
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontSize:
                                                                '1.125rem',
                                                            fontWeight: 500,
                                                            color: '#1F2937',
                                                            mb: 1,
                                                        }}
                                                    >
                                                        {serviceDetails.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#6B7280',
                                                        }}
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
                                                                service.quantity -
                                                                    1,
                                                            )
                                                        }
                                                        sx={{
                                                            minWidth: '22px',
                                                            width: '22px',
                                                            height: '22px',
                                                            p: 0,
                                                            border: '2px solid',
                                                            borderColor:
                                                                'blue.900',
                                                            borderRadius: '50%',
                                                            color: 'blue.900',
                                                            bgcolor: 'white',
                                                        }}
                                                    >
                                                        <Minus size={20} />
                                                    </Button>

                                                    <Typography
                                                        sx={{
                                                            fontSize:
                                                                '1.125rem',
                                                            fontWeight: 600,
                                                            width: '32px',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        {service.quantity}
                                                    </Typography>
                                                    <Button
                                                        onClick={() =>
                                                            handleUpdateServices(
                                                                service.serviceId,
                                                                service.quantity +
                                                                    1,
                                                            )
                                                        }
                                                        sx={{
                                                            minWidth: '22px',
                                                            width: '22px',
                                                            height: '22px',
                                                            p: 0,
                                                            border: '2px solid',
                                                            borderColor:
                                                                'blue.900',
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
                                                    Total:{' '}
                                                    {formatCurrency(total)}
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
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    Sub total:
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    {formatCurrency(
                                        values.services.reduce(
                                            (total, service) => {
                                                const serviceDetails =
                                                    services?.items.find(
                                                        (s) =>
                                                            s.id ===
                                                            service.serviceId,
                                                    )
                                                return (
                                                    total +
                                                    (serviceDetails?.price ||
                                                        0) *
                                                        service.quantity
                                                )
                                            },
                                            0,
                                        ),
                                    )}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}
            </FormSection>

            {/* TODO - USUARIOS E ROLES */}

            {/* <FormSection title="Detalhes adicionais">
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
            </FormSection> */}

            <HousingUnitModal
                open={isHousingUnitModalOpen}
                onClose={() => setIsHousingUnitModalOpen(false)}
                onSelect={(housingUnitId, finalPrice) => {
                    setFieldValue('housingUnitId', housingUnitId)
                    setFieldValue('finalPrice', finalPrice)
                    setFieldValue('summary.dailyTotal', finalPrice)
                }}
                selectedHousingUnitId={values.housingUnitId}
                adults={values.adults ? values.adults : 0}
                childrens={
                    values.ageGroups
                        ? values.ageGroups.reduce(
                              (sum, c) => sum + Number(c.quantity),
                              0,
                          )
                        : 0
                }
                startDate={values.startDate}
                endDate={values.endDate}
            />

            <ServicesModal
                open={isServicesModalOpen}
                onClose={() => setIsServicesModalOpen(false)}
                onUpdateServices={handleUpdateServices}
                selectedServices={values.services || []}
                services={services}
            />
        </FormContainer>
    )
}
