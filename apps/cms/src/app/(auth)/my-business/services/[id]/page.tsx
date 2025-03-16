'use client'

import { updateService, useGetServiceById } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'

import { ServiceForm } from '@/app/(auth)/my-business/services/serviceForm'
import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { PageHeader } from '@/components/organisms/PageHeader'
import {
    createFormInitialValues,
    ServiceFormData,
    serviceFormSchema,
} from '../utils/config'

interface UpdateServiceProps {
    params: { id: string }
}

export default function UpdateService({ params }: UpdateServiceProps) {
    const companyId = useCurrentCompanyId()

    const { data: service } = useGetServiceById({
        companyId,
        id: params.id,
    })

    const toast = useToast()

    async function handleSubmit(formData: ServiceFormData) {
        try {
            await updateService({ id: params.id, companyId }, formData)

            toast({
                title: 'Experiência editada com sucesso',
                status: 'success',
            })
        } catch (error) {
            toast({
                title: 'Erro ao editar experiência',
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
                    <ServiceForm />
                </Formik>
            )}
        </div>
    )
}
