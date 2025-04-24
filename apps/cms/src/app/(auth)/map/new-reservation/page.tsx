'use client'

import { useCreateReservation } from '@booksuite/sdk'
import { MenuItem, Stack, TextField } from '@mui/material'
import { Formik } from 'formik'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { omit } from 'radash'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { NewReservationForm } from './components/NewReservationForm'
import ReservationSummary from './components/ReservationSummary'
import {
    createReservationFormInitialValues,
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
                data: {
                    ...omit(formData, ['summary', 'sellerUserId']),
                    startDate: moment(formData.startDate).toISOString(),
                    endDate: moment(formData.endDate).toISOString(),
                    finalPrice:
                        formData.summary.dailyTotal +
                        formData.summary.additionalTotal +
                        formData.summary.rateOption.price,
                },
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
                validationSchema={reservationFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => back()}>
                    <Stack display="flex" flexDirection="row" gap={7}>
                        <Stack width="100%">
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

                            <NewReservationForm />
                        </Stack>

                        <ReservationSummary />
                    </Stack>
                </FormikController>
            </Formik>
        </>
    )
}
