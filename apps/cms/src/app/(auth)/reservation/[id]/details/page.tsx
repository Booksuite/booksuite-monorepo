'use client'

import {
    useGetReservationById,
    useReservationControllerUpdate,
} from '@booksuite/sdk'
import {
    Grid,
    MenuItem,
    TextField,
    Stack,
    Button,
    Box,
    Typography,
    Menu,
} from '@mui/material'
import { Formik } from 'formik'
import { useRouter, useParams } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { ReservationForm } from './components/ReservationForm'
import ReservationSummary from './components/ReservationSummary'
import {
    createReservationFormInitialValues,
    normalizeReservationFormData,
    ReservationFormData,
    reservationFormSchema,
} from './utils/config'
import { RESERVATION_OPTIONS } from './utils/constants'
import { getErrorMessage } from '@/common/utils/errorHandling'
import { EllipsisVertical } from 'lucide-react'
import { theme } from '@/common/theme'

export default function EditReservation() {
    const { id } = useParams() as { id: string }
    const { back, push } = useRouter()
    const companyId = useCurrentCompanyId()
    const { data, isLoading } = useGetReservationById({ id, companyId })
    const { mutateAsync: updateReservation, isPending: isSaving } =
        useReservationControllerUpdate()

    const [hasCheckedIn, setHasCheckedIn] = useState(false)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // Synchronize Formik state with fetched reservation data for housingUnitType, rateOption, and services
    const initialValues = createReservationFormInitialValues(data ?? undefined)

    if (isLoading) {
        return (
            <Stack alignItems="center" justifyContent="center" minHeight="60vh">
                <CircularProgress />
            </Stack>
        )
    }

    return (
        <>
            <PageHeader
                title={`Reserva ${data?.reservationCode || ''}`}
                backLButtonLabel="Lista de reservas"
                backButtonHref="/reservation"
            />
            <Formik<ReservationFormData>
                initialValues={initialValues}
                enableReinitialize
                validateOnMount
                validateOnChange
                validationSchema={reservationFormSchema}
                onSubmit={async (formData, { setSubmitting }) => {
                    try {
                        await updateReservation({
                            id,
                            companyId,
                            data: normalizeReservationFormData(formData),
                        })
                        enqueueSnackbar('Reserva atualizada com sucesso', {
                            variant: 'success',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right',
                            },
                            autoHideDuration: 3000,
                        })
                        push('/reservation')
                    } catch (error) {
                        enqueueSnackbar(
                            `Erro ao atualizar reserva ${getErrorMessage(error)}`,
                            {
                                variant: 'error',
                                anchorOrigin: {
                                    vertical: 'top',
                                    horizontal: 'right',
                                },
                                autoHideDuration: 3000,
                            },
                        )
                    } finally {
                        setSubmitting(false)
                    }
                }}
            >
                {({ resetForm, setValues, values }) => {
                    useEffect(() => {
                        if (data) {
                            // Ensure housingUnitType, rateOption, and services are set after mount
                            setValues((prev) => ({
                                ...prev,
                                housingUnitType:
                                    data.housingUnitType ||
                                    prev.housingUnitType,
                                housingUnitTypeId:
                                    data.housingUnitTypeId ||
                                    prev.housingUnitTypeId,
                                rateOption: data.rateOption || prev.rateOption,
                                rateOptionId:
                                    data.rateOptionId ||
                                    data.rateOption?.id ||
                                    prev.rateOptionId,
                                services:
                                    data.services?.map((s) => ({
                                        id: s.id,
                                        serviceId: s.service.id,
                                        quantity: s.quantity || 0,
                                        totalPrice: s.totalPrice || 0,
                                        service: s.service,
                                    })) || prev.services,
                            }))
                        }
                    }, [data, setValues])
                    return (
                        <FormikController
                            onCancel={() => {
                                resetForm()
                                back()
                            }}
                        >
                            <Grid container spacing={6} alignItems="flex-start">
                                <Grid size={8}>
                                    <Stack gap={4}>
                                        <TextField
                                            select
                                            label="Status da Reserva"
                                            name="status"
                                            fullWidth
                                            margin="normal"
                                            defaultValue={data?.status || ''}
                                            {...(data && {
                                                value: data.status,
                                            })}
                                        >
                                            {RESERVATION_OPTIONS.map(
                                                ({ label, value }) => (
                                                    <MenuItem
                                                        key={value}
                                                        value={value}
                                                    >
                                                        {label}
                                                    </MenuItem>
                                                ),
                                            )}
                                        </TextField>
                                        <ReservationForm />
                                    </Stack>
                                </Grid>
                                <Grid size={4}>
                                    <Stack
                                        direction="row"
                                        justifyContent="end"
                                        width="100%"
                                        mt={-7}
                                    >
                                        <Button
                                            onClick={handleClick}
                                            sx={{
                                                textTransform: 'none',
                                                color: 'blue.400',
                                                bgcolor: 'white',
                                            }}
                                            endIcon={
                                                <EllipsisVertical
                                                    size={20}
                                                    color={
                                                        theme.palette.blue[400]
                                                    }
                                                />
                                            }
                                        >
                                            <Typography
                                                variant="h6"
                                                fontSize={16}
                                                sx={{
                                                    '&:hover': {
                                                        textDecoration:
                                                            'underline',
                                                    },
                                                }}
                                            >
                                                Mais opções
                                            </Typography>
                                        </Button>
                                    </Stack>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            Hospedar
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            {hasCheckedIn
                                                ? 'Fazer Check-out'
                                                : 'Efetuar Check-in manual'}
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            Copiar link de check-in
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            Reenviar check-in
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            Baixar voucher
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            Baixar FNRH
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            Reenviar e-mail para o hóspede
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            Cancelar Reserva
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            Marcar como No-Show
                                        </MenuItem>
                                    </Menu>

                                    <Box
                                        sx={{
                                            position: 'sticky',
                                            marginTop: 5,
                                            zIndex: 1000,
                                        }}
                                    >
                                        <ReservationSummary />
                                    </Box>
                                </Grid>
                            </Grid>
                        </FormikController>
                    )
                }}
            </Formik>
        </>
    )
}
