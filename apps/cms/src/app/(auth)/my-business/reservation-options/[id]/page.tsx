'use client'

import {
    ReservationOptionInput,
    useReservationOptionsControllerGetById,
    useReservationOptionsControllerUpdate,
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

interface UpdateReservationOptionProps {
    params: { id: string }
}

export default function UpdateReservationOption({
    params,
}: UpdateReservationOptionProps) {
    const { push } = useRouter()
    const companyId = useCurrentCompanyId()
    const queryClient = useQueryClient()

    const { mutateAsync: createReservationOption } =
        useReservationOptionsControllerUpdate()

    const {
        data: ReservationOptionsData,
        isLoading,
        queryKey,
    } = useReservationOptionsControllerGetById({
        companyId,
        id: params.id,
    })

    const toast = useToast()

    async function handleSubmit(formData: ReservationOptionInput) {
        try {
            await createReservationOption({
                companyId,
                id: params.id,
                data: {
                    ...formData,
                    availableWeekend: formData.availableWeekend.map(Number),
                },
            })

            await queryClient.invalidateQueries({ queryKey: queryKey })
            await queryClient.invalidateQueries({
                queryKey: ['searchReservationOption'],
                refetchType: 'all',
            })

            await queryClient.invalidateQueries({
                queryKey: ['searchHousingUnitTypes'],
                refetchType: 'all',
            })

            push('/my-business/reservation-options')

            enqueueSnackbar('Tarifa modificada com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                        horizontal: 'right',
                    },
                autoHideDuration: 3000,
            })
        } catch (error) {
            enqueueSnackbar('Erro ao modificadar tarifa', {
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
                title="Modificar Opção de Tarfia"
                backLButtonLabel="Opções de Tarifa"
                backButtonHref="/my-business/reservation-options"
            />

            {!isLoading && (
                <Formik<ReservationOptionData>
                    initialValues={createReservationOptionFormInitialValues(
                        ReservationOptionsData,
                    )}
                    validationSchema={reservationOptionFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController
                        onCancel={() =>
                            push('/my-business/reservation-options')
                        }
                    >
                        <ReservationOptionForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
