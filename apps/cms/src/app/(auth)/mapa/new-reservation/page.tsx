'use client'

import { useCreateReservation } from '@booksuite/sdk'
import { MenuItem, Stack, TextField } from '@mui/material'
import { Formik } from 'formik'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { omit } from 'radash'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { BudgetForm } from './components/BudgetForm'
import { NewReservationForm } from './components/NewReservationForm'
import { PreReservationForm } from './components/PreReservationForm'
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

    const renderFormByType = () => {
        switch (selectedType) {
            case 'BUDGET':
                return <BudgetForm />
            case 'CONFIRMED':
                return <NewReservationForm />
            case 'WAITING_LIST':
                return <PreReservationForm />
            default:
                return null
        }
    }

    const handleSubmit = async (formData: ReservationFormData) => {
        try {
            await createReservation({
                companyId,
                data: {
                    ...omit(formData, ['summary', 'sellerUserId', 'userId']),
                    startDate: moment(formData.startDate).toISOString(),
                    endDate: moment(formData.endDate).toISOString(),
                    reservationOption: [
                        {
                            reservationOptionId:
                                formData.reservationOption[0]
                                    ?.reservationOptionId || '',
                        },
                    ],
                    finalPrice:
                        formData.summary.dailyTotal +
                        formData.summary.additionalTotal,
                },
            })
        } catch {}
    }

    return (
        <>
            <PageHeader
                title="Nova Reserva"
                backLButtonLabel="Mapa"
                backButtonHref="/mapa"
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
                                label="Tipo de Variação do Preço"
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

                            {renderFormByType()}
                        </Stack>

                        <ReservationSummary />
                    </Stack>
                </FormikController>
            </Formik>
        </>
    )
}
