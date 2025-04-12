'use client'

import { useGetBannerById, useUpdateBanner } from '@booksuite/sdk'
import { Formik } from 'formik'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { BannerForm } from '../components/BannerForm'
import {
    BannerFormData,
    bannerFormSchema,
    createBannerInitialValues,
    transformFromApiData,
    transformToApiData,
} from '../utils/config'

export default function UpdateBanner() {
    const params = useParams()
    const companyId = useCurrentCompanyId()
    const { enqueueSnackbar } = useSnackbar()
    const { back } = useRouter()

    const { mutateAsync: updateBanner } = useUpdateBanner()
    const { data: banner } = useGetBannerById({
        id: params.id as string,
        companyId,
    })

    async function handleSubmit(formData: BannerFormData) {
        try {
            await updateBanner({
                companyId,
                id: params.id as string,
                data: transformToApiData(formData, false),
            })

            enqueueSnackbar('Banner atualizado com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch {
            enqueueSnackbar('Ocorreu um erro ao atualizar banner', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
        }
    }

    const initialValues = banner
        ? transformFromApiData(banner)
        : createBannerInitialValues()

    return (
        <>
            <PageHeader
                title="Editar Banner"
                backLButtonLabel="Banners"
                backButtonHref="/marketing/banner"
            />

            <Formik<BannerFormData>
                initialValues={initialValues}
                validationSchema={bannerFormSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                <FormikController onCancel={() => back()}>
                    <BannerForm />
                </FormikController>
            </Formik>
        </>
    )
}
