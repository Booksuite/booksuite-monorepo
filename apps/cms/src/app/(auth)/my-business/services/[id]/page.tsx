'use client'

import { useGetServiceById, useUpdateService } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { ServiceForm } from '@/app/(auth)/my-business/services/components/ServiceForm'
import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import {
    createFormInitialValues,
    ServiceFormData,
    serviceFormSchema,
    transformFormDataForSubmit,
} from '../utils/config'

interface UpdateServiceProps {
    params: { id: string }
}

export default function UpdateService({ params }: UpdateServiceProps) {
    const companyId = useCurrentCompanyId()
    const { back } = useRouter()
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar()

    const { data: service, queryKey } = useGetServiceById({
        companyId,
        id: params.id,
    })

    const { mutateAsync: updateServiceData } = useUpdateService()

    async function handleSubmit(formData: ServiceFormData) {
        try {
            const apiData = transformFormDataForSubmit(formData)
            await updateServiceData({ id: params.id, companyId, data: apiData })

            enqueueSnackbar('Serviço modificado com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
            await queryClient.invalidateQueries({ queryKey: queryKey })
            await queryClient.invalidateQueries({
                queryKey: ['searchServices'],
                refetchType: 'all',
            })

            back()
        } catch {
            enqueueSnackbar('Erro ao modificadar serviço', {
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
                title="Editar Serviços"
                backButtonHref="/my-business/services"
                backLButtonLabel="Meu Negócio"
            />

            {!!service && (
                <Formik<ServiceFormData>
                    initialValues={createFormInitialValues(service)}
                    validationSchema={serviceFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <ServiceForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
