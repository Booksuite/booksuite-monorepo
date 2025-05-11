'use client'

import { useCreateReservation } from '@booksuite/sdk'
import { Grid, MenuItem, TextField } from '@mui/material'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

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

export default function NewReservation() {
    const [selectedType, setSelectedType] = useState('')
    const { back } = useRouter()
    const { mutateAsync: createReservation } = useCreateReservation()
    const companyId = useCurrentCompanyId()

    const handleSubmit = async (formData: ReservationFormData) => {
        try {
            await createReservation({
                companyId,
                data: normalizeReservationFormData(formData),
            })

            enqueueSnackbar('Reserva criada com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
        } catch {
            enqueueSnackbar('Erro ao criar reserva', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
        }
    }

    return (
        <>
            <PageHeader
                title="Nova Reserva"
                backLButtonLabel="Mapa"
                backButtonHref="/map"
            />

            <Formik<ReservationFormData>
                initialValues={createReservationFormInitialValues()}
                validateOnMount={false}
                validateOnChange={false}
                validationSchema={reservationFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => back()}>
                    <Grid container spacing={6}>
                        <Grid size={8}>
                            <TextField
                                select
                                label="Status de Reserva"
                                value={selectedType}
                                onChange={(e) =>
                                    setSelectedType(e.target.value)
                                }
                            >
                                {RESERVATION_OPTIONS.map(({ label, value }) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <ReservationForm />
                        </Grid>

                        <Grid size={4}>
                            <ReservationSummary />
                        </Grid>
                    </Grid>
                </FormikController>
            </Formik>
        </>
    )
}
