'use client'

import { Formik } from 'formik'

import { PageHeader } from '@/components/organisms/PageHeader'

import { AgePolicyForm } from './components/AgePolicyForm'
import {
    AgePolicyFormData,
    agePolicyFormSchema,
    createAgePolicyInitialValues,
} from './utils/config'

export default function PoliticaDeIdade() {
    function handleSubmit(formData: AgePolicyFormData) {
        return null
    }

    return (
        <div className="PoliticaDeIdade">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Política de Idade</PageHeader.Title>
            </PageHeader.Root>

            <Formik<AgePolicyFormData>
                initialValues={createAgePolicyInitialValues()}
                validationSchema={agePolicyFormSchema}
                onSubmit={handleSubmit}
            >
                <AgePolicyForm />
            </Formik>
        </div>
    )
}
