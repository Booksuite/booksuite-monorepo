'use client'

import { useCreateService } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { ServiceForm } from '../components/ServiceForm'
import {
    createFormInitialValues,
    ServiceFormData,
    serviceFormSchema,
    transformFormDataForSubmit,
} from '../utils/config'
import { getErrorMessage } from '@/common/utils'

export default function CreateServicePage() {
    const companyId = useCurrentCompanyId()
    const { back } = useRouter()
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar()
    const { mutateAsync: createService } = useCreateService()

    async function handleSubmit(formData: ServiceFormData) {
        const apiData = transformFormDataForSubmit(formData)

        try {
            await createService({
                companyId,
                data: apiData,
            })

            enqueueSnackbar('Serviço criado com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            await queryClient.invalidateQueries({
                queryKey: ['searchService'],
                refetchType: 'all',
            })

            back()
        } catch (error) {
            enqueueSnackbar(`Erro ao criar serviço ${getErrorMessage(error)}`, {
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
        <div className="CreateService">
            <PageHeader.Root>
                <PageHeader.BackLink href="/my-business/services">
                    Serviços
                </PageHeader.BackLink>
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
