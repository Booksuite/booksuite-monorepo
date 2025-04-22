'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { omit } from 'radash'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import VisualIdentityForm from './components/VisualIdentityForm'
import {
    createvisualIdentityInitialValues,
    visualIdentityFormData,
    visualIdentityFormSchema,
} from './utils/config'

export default function VisualIdentity() {
    const { back } = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const companyId = useCurrentCompanyId()
    const {
        data: visualData,
        isLoading,
        queryKey,
    } = useGetCompanyById({ id: companyId })

    const queryClient = useQueryClient()

    const { mutateAsync: updateCompanyVisualData } = useUpdateCompany()

    async function handleSubmit(formData: visualIdentityFormData) {
        try {
            await updateCompanyVisualData({
                id: companyId,
                data: omit(formData, ['medias']),
            })

            queryClient.invalidateQueries({ queryKey })

            enqueueSnackbar('Identidade visual modificada com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
        } catch {
            enqueueSnackbar(`Erro ao modificar identidade visual`, {
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
        <div className="visual_identity">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Identidade Visual</PageHeader.Title>
            </PageHeader.Root>

            {!isLoading && (
                <Formik<visualIdentityFormData>
                    initialValues={createvisualIdentityInitialValues(
                        visualData,
                    )}
                    validationSchema={visualIdentityFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <VisualIdentityForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
