'use client'

import {
    useGetCompanyCancellationPolicy,
    useUpsertCompanyCancellationPolicy,
} from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { PageHeader } from '@/components/organisms/PageHeader'

import { CancellationPolicyForm } from './components/CancellationPolicyForm'
import {
    CancellationPolicyFormData,
    cancellationPolicyFormSchema,
    createCancellationPolicyInitialValues,
} from './utils/config'

export default function CancellationPolicy() {
    const companyId = useCurrentCompanyId()
    const toast = useToast()

    const { data: cancellatonPolicyData, isLoading } =
        useGetCompanyCancellationPolicy({ companyId: companyId })

    const { mutateAsync: UpdateCancellationPolicy } =
        useUpsertCompanyCancellationPolicy()


    async function handleSubmit(formData: CancellationPolicyFormData) {
        try {
            await UpdateCancellationPolicy({
                companyId: companyId,
                data: formData,
            })

            toast({
                title: 'Políticas de Cancelamento modificadas com sucesso',
                status: 'success',
            })
        } catch (erro) {
            toast({
                title: 'Erro ao modificar políticas de cancelamento',
                status: 'error',
            })
        }
    }

    return (
        <div className="cancellation_policy">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Política de Cancelamento</PageHeader.Title>
            </PageHeader.Root>

            {!isLoading && (
                <Formik<CancellationPolicyFormData>
                    initialValues={createCancellationPolicyInitialValues(
                        cancellatonPolicyData,
                    )}
                    validationSchema={cancellationPolicyFormSchema}
                    onSubmit={handleSubmit}
                >
                    <CancellationPolicyForm />
                </Formik>
            )}
        </div>
    )
}
