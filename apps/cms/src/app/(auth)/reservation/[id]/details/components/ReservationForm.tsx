import { useGetCompanyAgePolicy } from '@booksuite/sdk'
import { Grid, Link, Stack, TextField, Typography } from '@mui/material'
import { getIn, useFormikContext } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { ReservationFormData } from '../utils/config'

import { HousingUnitTypeSection } from './HousingUnitTypeSection'
import { ServicesSection } from './ServicesSection'
import dayjs from 'dayjs'

export const ReservationForm: React.FC = () => {
    const { setFieldValue, errors, values, getFieldProps, touched } =
        useFormikContext<ReservationFormData>()

    const companyId = useCurrentCompanyId()

    const { data: agePolicy } = useGetCompanyAgePolicy({ companyId })

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
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
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
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
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

                {agePolicy?.ageGroups.map((policyAgeGroup) => {
                    const quantity = values.ageGroups[policyAgeGroup.id] ?? 0

                    return (
                        <NumberInput
                            key={policyAgeGroup.id}
                            min={0}
                            label={`Crianças (${policyAgeGroup.initialAge} a ${policyAgeGroup.finalAge})`}
                            disabled={
                                values.startDate && values.endDate
                                    ? false
                                    : true
                            }
                            value={quantity}
                            onChange={(e) => {
                                setFieldValue('ageGroups', {
                                    ...values.ageGroups,
                                    [policyAgeGroup.id]: Number(e.target.value),
                                })
                            }}
                        />
                    )
                })}
            </FormSection>

            <HousingUnitTypeSection />

            <ServicesSection />

            {/* TODO - USUARIOS E ROLES */}

            <FormSection>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                    alignItems="center"
                >
                    <Typography variant="body1">Data de criação</Typography>
                    <Typography variant="body1">
                        {dayjs(values.createdAt).format('DD/MM/YYYY')}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                    alignItems="center"
                >
                    <Typography variant="body1">Modificado em</Typography>
                    <Typography variant="body1">
                        {dayjs(values.updatedAt).format('DD/MM/YYYY')}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="end"
                    width="100%"
                    alignItems="center"
                >
                    <Link
                        href={`/reservation`}
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        <Typography
                            variant="h6"
                            color="blue.900"
                            fontSize={16}
                            sx={{
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Ver todas as modificações
                        </Typography>
                    </Link>
                </Stack>
            </FormSection>
        </FormContainer>
    )
}
