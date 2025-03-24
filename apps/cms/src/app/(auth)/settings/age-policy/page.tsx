'use client'

import {
    useGetCompanyAgePolicy,
    useUpsertCompanyAgePolicy,
} from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { PageHeader } from '@/components/organisms/PageHeader'

import { AgePolicyForm } from './components/AgePolicyForm'
import {
    AgePolicyFormData,
    agePolicyFormSchema,
    createAgePolicyInitialValues,
} from './utils/config'

export default function PoliticaDeIdade() {
    const companyId = useCurrentCompanyId()
    const toast = useToast()

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
        } catch (erro) {
            toast({
                title: 'Erro ao modificar Políticas de Idade',
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

            <Formik<AgePolicyFormData>
                initialValues={createAgePolicyInitialValues()}
                validationSchema={agePolicyFormSchema}
                onSubmit={handleSubmit}
            >
                <AgePolicyForm />
            </Formik>
        </div>
    )
}
