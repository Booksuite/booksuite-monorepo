'use client'

import { useGetRateOptionById, useUpdateRateOption } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { RateOptionForm } from '../components/RateOptionForm'
import {
    createReservationOptionFormInitialValues,
    RateOptionData,
    reservationOptionFormSchema,
} from '../utils/config'

interface UpdateReservationOptionProps {
    params: { id: string }
}

export default function UpdateRateOption({
    params,
}: UpdateReservationOptionProps) {
    const { push } = useRouter()
    const companyId = useCurrentCompanyId()
    const queryClient = useQueryClient()

    const { mutateAsync: updateRateOption } = useUpdateRateOption()

    const {
        data: RateOptionData,
        isLoading,
        queryKey,
    } = useGetRateOptionById({
        companyId,
        id: params.id,
    })

    async function handleSubmit(formData: RateOptionData) {
        try {
            await updateRateOption({
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

            push('/my-business/rate-options')

            enqueueSnackbar('Tarifa modificada com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
        } catch {
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
                backButtonHref="/my-business/rate-options"
            />

            {!isLoading && (
                <Formik<RateOptionData>
                    initialValues={createReservationOptionFormInitialValues(
                        RateOptionData,
                    )}
                    validationSchema={reservationOptionFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController
                        onCancel={() => push('/my-business/rate-options')}
                    >
                        <RateOptionForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
