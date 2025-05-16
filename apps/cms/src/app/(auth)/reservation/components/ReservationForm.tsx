import { TextField } from '@mui/material'
import { getIn, useFormikContext } from 'formik'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { ReservationFormData } from '../utils/config'

import { ReservationMain } from './ReservationMain'
import { ServicesSection } from './ServicesSection'

export const ReservationForm: React.FC = () => {
    const { setFieldValue, values, getFieldProps } =
        useFormikContext<ReservationFormData>()

    return (
        <FormContainer>
            <FormSection title="Informações do hóspede">
                <TextField label="Nome Completo" fullWidth />

                <TextField label="E-mail" fullWidth />

                <TextField label="Telefone/WhatsApp com DDD" fullWidth />
            </FormSection>

            <ReservationMain />

            <ServicesSection
                reservationSummary={values.summary}
                currentServices={values.services}
                services={values.services}
                adults={values.adults}
                startDate={values.startDate}
                endDate={values.endDate}
                onChange={(services) => {
                    setFieldValue('services', services)
                }}
            />
            {/* TODO - USUARIOS E ROLES */}
        </FormContainer>
    )
}
