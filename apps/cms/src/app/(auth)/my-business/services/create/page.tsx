'use client'

import { useCreateService } from '@booksuite/sdk'
import { Flex, useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { ServiceForm } from '../components/ServiceForm'
import {
    createFormInitialValues,
    ServiceFormData,
    serviceFormSchema,
    transformFormDataForSubmit,
} from '../utils/config'

export default function CreateServicePage() {
    const companyId = useCurrentCompanyId()
    const { back } = useRouter()
    const queryClient = useQueryClient()
    const { mutateAsync: createService } = useCreateService()

    const toast = useToast()

    async function handleSubmit(formData: ServiceFormData) {
        const apiData = transformFormDataForSubmit(formData)

        try {
            await createService({
                companyId,
                data: apiData,
            })

            toast({
                title: 'Experiência Criada com sucesso',
                status: 'success',
            })

            await queryClient.invalidateQueries({
                queryKey: ['searchService'],
                refetchType: 'all',
            })

            back()
        } catch (error) {
            toast({
                title: 'Erro ao criar experiência',
                description: getErrorMessage(error),
                status: 'error',
            })
        }
    }

    return (
        <div className="CreateService">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/my-business/services">
                        Serviços
                    </PageHeader.BackLink>
                </Flex>

                <PageHeader.Title>Criar Serviço</PageHeader.Title>
            </PageHeader.Root>

            <Formik<ServiceFormData>
                initialValues={createFormInitialValues()}
                validationSchema={serviceFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => back()}>
                    <ServiceForm />
                </FormikController>
            </Formik>
        </div>
    )
}
