'use client'

import { MenuItem, Stack, TextField } from '@mui/material'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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

    const handleSubmit = (values: ReservationFormData) => {
        try {
            back()
        } catch {
            back()
        }
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
