'use client'

import {
    ReservationOptionFull,
    ReservationOptionInput,
    useReservationOptionsControllerCreate,
} from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { ReservationOptionForm } from '../components/ReservationOptionsForm'
import {
    createReservationOptionFormInitialValues,
    ReservationOptionData,
    reservationOptionFormSchema,
} from '../utils/config'

export default function CreateReservationOption() {
    const { push } = useRouter()
    const companyId = useCurrentCompanyId()
    const queryClient = useQueryClient()

    const { mutateAsync: createReservationOption } =
        useReservationOptionsControllerCreate()

    const toast = useToast()

    async function handleSubmit(formData: ReservationOptionInput) {
        try {
            await createReservationOption({
                companyId,
                data: {
                    ...formData,
                    availableWeekend: formData.availableWeekend.map(Number),
                },
            })

            await queryClient.invalidateQueries({
                queryKey: ['searchReservationOption'],
                refetchType: 'all',
            })

            push('/my-business/reservation-options')

            enqueueSnackbar('Tarifa criada com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
        } catch (error) {
            enqueueSnackbar('Erro ao modificar tarifa com sucesso', {
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
        <div>
            <PageHeader
                title="Criar Opção de Tarfia"
                backLButtonLabel="Opções de Tarifa"
            />

            <Formik<ReservationOptionData>
                initialValues={createReservationOptionFormInitialValues()}
                validationSchema={reservationOptionFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => push('/my-business/rooms')}>
                    <ReservationOptionForm />
                </FormikController>
            </Formik>
        </div>
    )
}
