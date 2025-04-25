'use client'

import { useCreateRateOption } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { RateOptionForm } from '../components/RateOptionForm'
import {
    createRateOptionFormInitialValues,
    RateOptionData,
    rateOptionFormSchema,
    transformRateOptionUpdateToInput,
} from '../utils/config'

export default function CreateRateOption() {
    const { push } = useRouter()
    const companyId = useCurrentCompanyId()
    const queryClient = useQueryClient()

    const { mutateAsync: createRateOption } = useCreateRateOption()

    async function handleSubmit(formData: RateOptionData) {
        const apiData = transformRateOptionUpdateToInput(formData)

        try {
            await createRateOption({
                companyId,
                data: apiData,
            })

            await queryClient.invalidateQueries({
                queryKey: ['searchRateOption'],
                refetchType: 'all',
            })

            push('/my-business/rate-options')

            enqueueSnackbar('Tarifa criada com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
        } catch {
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

            <Formik<RateOptionData>
                initialValues={createRateOptionFormInitialValues()}
                validationSchema={rateOptionFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => push('/my-business/rooms')}>
                    <RateOptionForm />
                </FormikController>
            </Formik>
        </div>
    )
}
