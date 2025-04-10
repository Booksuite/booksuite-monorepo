'use client'

import { useUpdateBanner } from '@booksuite/sdk'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { BannerForm } from '../components/BannerForm'
import {
    BannerFormData,
    bannerFormSchema,
    createBannerInitialValues,
} from '../utils/config'

export default function UpdateBanner() {
    const companyId = useCurrentCompanyId()
    const { enqueueSnackbar } = useSnackbar()
    const { back } = useRouter()

    const { mutateAsync: updateBanner } = useUpdateBanner()

    async function handleSubmit(formData: BannerFormData) {
        try {
            const transformedFormData = {
                ...formData,
                order: Number(formData.order) || 0,
                medias: formData.medias.map((m, index) => ({
                    mediaId: m.media.id,
                    order: m.order ?? index,
                })),
            }

            await updateBanner({
                companyId,
                id: params.id,
                data: transformedFormData,
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
            enqueueSnackbar(`Ocorreu um erro ao atualizar banner`, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
        }
    }

    return (
        <>
            <PageHeader
                title="Editar Banner"
                backLButtonLabel="Banners"
                backButtonHref="/marketing/banners"
            />

            <Formik<BannerFormData>
                initialValues={createBannerInitialValues()}
                validationSchema={bannerFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => back()}>
                    <BannerForm />
                </FormikController>
            </Formik>
        </>
    )
}
