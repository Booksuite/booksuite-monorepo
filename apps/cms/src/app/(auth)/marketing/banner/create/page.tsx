'use client'

import { useCreateBanner } from '@booksuite/sdk'
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

export default function CreateBanner() {
    const companyId = useCurrentCompanyId()
    const { enqueueSnackbar } = useSnackbar()
    const { back } = useRouter()

    const { mutateAsync: createBanner } = useCreateBanner()

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

            await createBanner({
                companyId,
                data: transformedFormData,
            })

            enqueueSnackbar('Banner criado com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch {
            enqueueSnackbar(`Ocorreu um erro ao criar banner}`, {
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
                title="Criar Banner"
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
