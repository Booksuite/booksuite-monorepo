'use client'

import { useGetCompanyHostingRules } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { PageHeader } from '@/components/organisms/PageHeader'

import { HostingRulesForm } from './components/HostingRulesForm'
import {
    createHostingRulesInitialValues,
    HostingRulesData,
} from './utils/config'

export default function HostingRules() {
    const companyId = useCurrentCompanyId()

    const { data: companyHostingRulesData, isLoading } =
        useGetCompanyHostingRules({
            companyId: companyId,
        })

    // const { mutateAsync: updateCompanyHostingRules } = upsertCompanyHostingRules({companyId: companyId}, {})

    const toast = useToast()

    async function handleSubmit(formData: HostingRulesData) {
        console.log(formData)
        // try {
        //     await updateCompany({
        //         id: companyId,
        //         data: formData,
        //     })
        //     toast({
        //         title: 'Dados gerais modificados com sucesso ',
        //         status: 'success',
        //     })
        // } catch (error) {
        //     toast({
        //         title: 'Erro ao editar dados gerais',
        //         description: getErrorMessage(error),
        //         status: 'error',
        //     })
        // }
    }

    return (
        <div className="hosting_rules">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Regras de Hospedagem</PageHeader.Title>
            </PageHeader.Root>

            {!isLoading && (
                <Formik<HostingRulesData>
                    initialValues={createHostingRulesInitialValues(
                        companyHostingRulesData,
                    )}
                    onSubmit={handleSubmit}
                >
                    <HostingRulesForm />
                </Formik>
            )}
        </div>
    )
}
