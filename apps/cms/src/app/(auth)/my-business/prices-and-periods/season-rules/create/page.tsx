'use client'

import { useSeasonRulesControllerCreate } from '@booksuite/sdk'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

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
    const { mutateAsync: createSeasonRule } = useSeasonRulesControllerCreate()

    async function handleSubmit(formData: SeasonRuleFormData) {
        const apiData = transformFormDataForSubmit(formData)

        try {
            await createSeasonRule({ companyId, data: apiData })

            enqueueSnackbar('Regras de temporada criada com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch {
            enqueueSnackbar(`Erro ao criar regras de temporada`, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 5000,
            })
        }
    }
    return (
        <>
            <PageHeader
                title="Criar Regras de Temporada"
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
        </>
    )
}
