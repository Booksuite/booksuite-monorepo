'use client'

import {
    useGetCompanyAgePolicy,
    useUpsertCompanyAgePolicy,
} from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { AgePolicyForm } from './components/AgePolicyForm'
import {
    AgePolicyFormData,
    agePolicyFormSchema,
    createAgePolicyInitialValues,
} from './utils/config'

export default function AgePolicy() {
    const companyId = useCurrentCompanyId()
    const toast = useToast()
    const { back } = useRouter()

    const { data: companyAgePolicyData, isLoading } = useGetCompanyAgePolicy({
        companyId: companyId,
    })

    const { mutateAsync: updateCompanyAgePolicy } = useUpsertCompanyAgePolicy()

    async function handleSubmit(formData: AgePolicyFormData) {
        try {
            await updateCompanyAgePolicy({
                companyId: companyId,
                data: formData,
            })
            toast({
                title: 'Políticas de Idade modificadas com sucesso',
                status: 'success',
            })
            back()
        } catch (error) {
            toast({
                title: 'Erro ao modificar Políticas de Idade',
                description: getErrorMessage(error),
                status: 'error',
            })
        }
    }

    return (
        <div className="PoliticaDeIdade">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Política de Idade</PageHeader.Title>
            </PageHeader.Root>

            {!isLoading && (
                <Formik<AgePolicyFormData>
                    initialValues={createAgePolicyInitialValues(
                        companyAgePolicyData,
                    )}
                    validationSchema={agePolicyFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <AgePolicyForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
