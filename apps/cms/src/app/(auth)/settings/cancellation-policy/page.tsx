'use client'

import {
    useGetCompanyCancellationPolicy,
    useUpsertCompanyCancellationPolicy,
} from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
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
    const { back } = useRouter()
    const queryClient = useQueryClient()

    const { data: cancellatonPolicyData, isLoading, queryKey } =
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

            await queryClient.invalidateQueries({ queryKey: queryKey })
            await queryClient.invalidateQueries({
                queryKey: ['searchHousingUnitTypes'],
                refetchType: 'all',
            })

            back()
        } catch (error) {
            toast({
                title: 'Erro ao modificar políticas de cancelamento',
                description: getErrorMessage(error),
                status: 'error',
            })
        }
    }

    return (
        <div className="cancellation_policy">
            <PageHeader
                title="Políticas de Cancelamento"
                backLButtonLabel="Configurações"
                isLoading={isLoading}
            />

            {!isLoading && (
                <Formik<CancellationPolicyFormData>
                    initialValues={createCancellationPolicyInitialValues(
                        cancellatonPolicyData,
                    )}
                    validationSchema={cancellationPolicyFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <CancellationPolicyForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
