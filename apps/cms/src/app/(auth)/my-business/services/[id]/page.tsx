'use client'

import { updateService, useGetServiceById } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { ServiceForm } from '@/app/(auth)/my-business/services/components/ServiceForm'
import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
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

    const { data: service } = useGetServiceById({
        companyId,
        id: params.id,
    })

    const toast = useToast()

    async function handleSubmit(formData: ServiceFormData) {
        try {
            const apiData = transformFormDataForSubmit(formData)
            await updateService({ id: params.id, companyId }, apiData)

            toast({
                title: 'Serviço modificado com sucesso',
                status: 'success',
            })
        } catch (error) {
            toast({
                title: 'Erro ao editar Serviço',
                description: getErrorMessage(error),
                status: 'error',
            })
        }
    }

    return (
        <div>
            <PageHeader
                title="Editar Experiências"
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
