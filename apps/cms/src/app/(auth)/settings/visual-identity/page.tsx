'use client'

import {
    useGetCompanyById,
    useUpdateCompany,
    useUploadMedia,
} from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
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

    const companyId = useCurrentCompanyId()
    const {
        data: visualData,
        isLoading,
        queryKey,
    } = useGetCompanyById({ id: companyId })

    const queryClient = useQueryClient()

    const { mutateAsync: uploadMedia } = useUploadMedia()
    const { mutateAsync: updateCompanyVisualData } = useUpdateCompany()

    async function handleSubmit(formData: visualIdentityFormData) {
        try {
            const logoIcon = formData.logoFile
                ? await uploadMedia({
                      companyId,
                      data: { file: formData.logoFile },
                  })
                : undefined

            const favIcon = formData.favIconFile
                ? await uploadMedia({
                      companyId,
                      data: { file: formData.favIconFile },
                  })
                : undefined

            await updateCompanyVisualData({
                id: companyId,
                data: {
                    ...omit(formData, ['favIconFile', 'logoFile']),
                    logo: logoIcon?.url ? logoIcon.url : formData.logo,
                    favIcon: favIcon?.url ? favIcon.url : formData.favIcon,
                },
            })

            queryClient.invalidateQueries({ queryKey })

            back()
        } catch {}
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
