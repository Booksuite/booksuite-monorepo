'use client'

import { Formik } from 'formik'

import { PageHeader } from '@/components/organisms/PageHeader'

import { CancellationPolicyForm } from './components/CancellationPolicyForm'
import {
    CancellationPolicyFormData,
    cancellationPolicyFormSchema,
    createCancellationPolicyInitialValues,
} from './utils/config'

export default function PoliticaDeCancelamento() {
    function handleSubmit(formData: CancellationPolicyFormData) {
        return null
    }

    return (
        <div className="cancellation_policy">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Política de Cancelamento</PageHeader.Title>
            </PageHeader.Root>

            <Formik<CancellationPolicyFormData>
                initialValues={createCancellationPolicyInitialValues()}
                validationSchema={cancellationPolicyFormSchema}
                onSubmit={handleSubmit}
            >
                <CancellationPolicyForm />
            </Formik>
        </div>
    )
}
