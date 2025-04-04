'use client'

import {
    useSeasonRulesControllerCreate,
    useSeasonRulesControllerUpdate,
} from '@booksuite/sdk'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { SeasonRulesForm } from '../components/SeasonRulesForm'
import {
    createFormInitialValues,
    SeasonRuleFormData,
    seasonRuleFormSchema,
    transformFormDataForSubmit,
} from '../utils/config'

export default function CreateSeasonRules() {
    const { back } = useRouter()

    const companyId = useCurrentCompanyId()
    const { mutateAsync: createSeasonRule, isLoading } =
        useSeasonRulesControllerCreate()

    async function handleSubmit(formData: SeasonRuleFormData) {
       
        const apiData = transformFormDataForSubmit(formData)
        console.log(apiData)
        try {
            await createSeasonRule({ companyId, data: apiData })
        } catch {}
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
