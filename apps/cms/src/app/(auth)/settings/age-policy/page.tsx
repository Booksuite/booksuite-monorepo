'use client'

import {
    useGetCompanyAgePolicy,
    useUpsertCompanyAgePolicy,
} from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { AgePolicyForm } from './components/AgePolicyForm'
import {
    AgePolicyFormData,
    agePolicyFormSchema,
    createAgePolicyInitialValues,
} from './utils/config'
import { getErrorMessage } from '@/common/utils'

export default function AgePolicy() {
    const companyId = useCurrentCompanyId()
    const { enqueueSnackbar } = useSnackbar()
    const { back } = useRouter()
    const queryClient = useQueryClient()

    const {
        data: companyAgePolicyData,
        isLoading,
        queryKey,
    } = useGetCompanyAgePolicy({
        companyId: companyId,
    })

    const { mutateAsync: updateCompanyAgePolicy } = useUpsertCompanyAgePolicy()

    async function handleSubmit(formData: AgePolicyFormData) {
        try {
            await updateCompanyAgePolicy({
                id: formData.id,
                companyId: companyId,
                data: formData,
            })

            await queryClient.invalidateQueries({ queryKey })

            enqueueSnackbar('Políticas de Idade modificadas com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
            back()
        } catch (error) {
            enqueueSnackbar(
                `Erro ao modificar políticas ${getErrorMessage(error)}`,
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    autoHideDuration: 5000,
                },
            )
        }
    }

    return (
        <div className="age_policy">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Política de Idade</PageHeader.Title>
            </PageHeader.Root>

            {!isLoading && (
                <Formik<AgePolicyFormData>
                    initialValues={createAgePolicyInitialValues(
                        companyAgePolicyData ?? undefined,
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
