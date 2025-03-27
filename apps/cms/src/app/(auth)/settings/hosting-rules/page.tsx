'use client'

import { useGetCompanyHostingRules } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { HostingRulesForm } from './components/HostingRulesForm'
import {
    createHostingRulesInitialValues,
    HostingRulesData,
} from './utils/config'

export default function HostingRules() {
    const companyId = useCurrentCompanyId()
    const { back } = useRouter()

    const { data: companyHostingRulesData, isLoading } =
        useGetCompanyHostingRules({
            companyId: companyId,
        })

    /*const { mutateAsync: updateCompanyHostingRules } =
        upsertCompanyHostingRules({ companyId: companyId }, {})*/

    const toast = useToast()

    async function handleSubmit(formData: HostingRulesData) {
        /*try {
            await updateCompany({
                id: companyId,
                data: formData,
            })
            toast({
                title: 'Dados gerais modificados com sucesso ',
                status: 'success',
            })
            back()
        } catch (error) {
            toast({
                title: 'Erro ao editar dados gerais',
                description: getErrorMessage(error),
                status: 'error',
            })
        }*/
    }

    return (
        <div className="hosting_rules">
            <PageHeader
                title="Regras de Hospedagem"
                backLButtonLabel="Configurações"
                isLoading={isLoading}
            />

            {!isLoading && (
                <Formik<HostingRulesData>
                    initialValues={createHostingRulesInitialValues(
                        companyHostingRulesData,
                    )}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <HostingRulesForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
