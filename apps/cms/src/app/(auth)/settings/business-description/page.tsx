'use client'

import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

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
    function handleSubmit() {
        try {
            back()
        } catch {
            return null
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

            <Formik<BusinessDescriptionFormData>
                initialValues={businessDescriptionInitialValues()}
                validationSchema={businessDescriptionFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => back()}>
                    <BusinessDescriptionForm />
                </FormikController>
            </Formik>
        </div>
    )
}
