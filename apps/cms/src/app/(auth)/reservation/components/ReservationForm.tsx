import { TextField } from '@mui/material'
import { getIn, useFormikContext } from 'formik'

import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { ReservationFormData } from '../utils/config'

import { ReservationMain } from './ReservationMain'
import { ServicesSection } from './ServicesSection'

export const ReservationForm: React.FC = () => {
    const { setFieldValue, errors, values, getFieldProps, touched } =
        useFormikContext<ReservationFormData>()

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
