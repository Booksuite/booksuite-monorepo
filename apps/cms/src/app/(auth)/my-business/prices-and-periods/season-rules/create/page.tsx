'use client'

import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { SeasonRulesForm } from '../components/SeasonRulesForm'
import {
    createFormInitialValues,
    SeasonRuleFormData,
    seasonRuleFormSchema,
} from '../utils/config'

export default function CreateSeasonRules() {
    const { back } = useRouter()

    async function handleSubmit() {
        return null
    }
    return (
        <div className="CreateService">
            <PageHeader
                title="Detalhes da Temporada"
                backLButtonLabel="Regras de Temporada"
                backButtonHref="/my-business/prices-and-periods/season-rules"
            />

            <Formik<SeasonRuleFormData>
                initialValues={createFormInitialValues()}
                validationSchema={seasonRuleFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => back()}>
                    <SeasonRulesForm />
                </FormikController>
            </Formik>
        </div>
    )
}
