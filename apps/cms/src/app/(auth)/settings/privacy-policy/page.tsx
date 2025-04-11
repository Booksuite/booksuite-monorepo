'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { PrivacyPolicyForm } from './components/PrivacyPolicyForm'
import {
    createPrivacyPolicyInitialValues,
    PrivacyPolicyFormData,
    privacyPolicyFormSchema,
} from './utils/config'

export default function PrivacyPolicy() {
    const companyId = useCurrentCompanyId()
    const { enqueueSnackbar } = useSnackbar()
    const { back } = useRouter()
    const queryClient = useQueryClient()

    const { data: companyData, queryKey } = useGetCompanyById({
        id: companyId,
    })

    const { mutateAsync: updatePrivacyPolicy } = useUpdateCompany()

    async function handleSubmit(formData: PrivacyPolicyFormData) {
        try {
            await updatePrivacyPolicy({
                id: companyId,
                data: formData,
            })

            await queryClient.invalidateQueries({ queryKey })

            enqueueSnackbar(
                'Políticas de privacidade modificadas com sucesso',
                {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    autoHideDuration: 3000,
                },
            )

            back()
        } catch {
            enqueueSnackbar(`Erro ao modificar políticas de privacidade`, {
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
        <div className="privacy_policy">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Política de Privacidade</PageHeader.Title>
            </PageHeader.Root>

            <Formik<PrivacyPolicyFormData>
                enableReinitialize
                initialValues={createPrivacyPolicyInitialValues(companyData)}
                validationSchema={privacyPolicyFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => back()}>
                    <PrivacyPolicyForm />
                </FormikController>
            </Formik>
        </div>
    )
}
