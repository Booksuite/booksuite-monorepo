'use client'

import {
    useGetCompanyHostingRules,
    useUpsertCompanyHostingRules,
} from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { HostingRulesForm } from './components/HostingRulesForm'
import {
    createHostingRulesInitialValues,
    HostingRulesData,
    hostingRulesDataSchema,
    transformFormDataForSubmit,
} from './utils/config'

export default function HostingRules() {
    const companyId = useCurrentCompanyId()
    const { enqueueSnackbar } = useSnackbar()
    const { back } = useRouter()
    const queryClient = useQueryClient()

    const { data: companyHostingRulesData, isLoading } =
        useGetCompanyHostingRules({
            companyId: companyId,
        })

    const { mutateAsync: updateCompanyHostingRules } =
        useUpsertCompanyHostingRules()

    async function handleSubmit(formData: HostingRulesData) {
        try {
            const apiData = transformFormDataForSubmit(formData)
            await updateCompanyHostingRules({
                companyId: companyId,
                data: apiData,
            })
            enqueueSnackbar('Regras de hospedagem modificadas com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
            await queryClient.invalidateQueries({
                queryKey: ['getCompanyHostingRules'],
                refetchType: 'all',
            })

            back()
        } catch {
            enqueueSnackbar(`Erro ao modificar regras`, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 5000,
            })
        }
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
                    validationSchema={hostingRulesDataSchema}
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
