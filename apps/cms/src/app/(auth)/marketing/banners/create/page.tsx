'use client'

import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { BannerForm } from '../components/BannerForm'
import {
    BannerFormData,
    bannerFormSchema,
    createBannerInitialValues,
} from '../utils/config'

export default function createBanner() {
    const { back } = useRouter()

    function handleSubmit(formData: BannerFormData) {
        try {
            back()
        } catch {
            back()
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
