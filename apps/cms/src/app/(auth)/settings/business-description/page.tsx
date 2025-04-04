'use client'

import {
    useGetCompanyById,
    useUpdateCompany,
    useUploadMedia,
} from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { omit } from 'radash'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { BusinessDescriptionForm } from './components/BusinessDescriptionForm'
import {
    BusinessDescriptionFormData,
    businessDescriptionFormSchema,
    businessDescriptionInitialValues,
} from './utils/config'

export default function BusinessDescription() {
    const { back } = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const companyId = useCurrentCompanyId()
    const {
        data: companydata,
        isLoading,
        queryKey,
    } = useGetCompanyById({
        id: companyId,
    })

    const queryClient = useQueryClient()

    const { mutateAsync: updateCompanyBusinessDescription } = useUpdateCompany()
    const { mutateAsync: uploadMedia } = useUploadMedia()

    async function handleSubmit(formData: BusinessDescriptionFormData) {
        try {
            const uploadedMedia = formData.bannerFile
                ? await uploadMedia({
                      companyId,
                      data: { file: formData.bannerFile },
                  })
                : undefined

            await updateCompanyBusinessDescription({
                id: companyId,
                data: {
                    ...omit(formData, ['bannerFile', 'bannerImage']),
                    bannerImageId: uploadedMedia?.id,
                },
            })

            await queryClient.invalidateQueries({ queryKey: queryKey })

            enqueueSnackbar('Descrição do negócio modificado com sucesso', {
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
                `Erro ao modificar a descrição do negócio: ${getErrorMessage(error)}`,
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
        <div className="business_description">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Descrição do Negócio</PageHeader.Title>
            </PageHeader.Root>

            {!isLoading && (
                <Formik<BusinessDescriptionFormData>
                    initialValues={businessDescriptionInitialValues(
                        companydata,
                    )}
                    validationSchema={businessDescriptionFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <BusinessDescriptionForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
