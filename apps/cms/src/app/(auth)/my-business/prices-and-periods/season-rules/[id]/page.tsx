'use client'

import {
    useSeasonRulesControllerGetById,
    useSeasonRulesControllerUpdate,
} from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { SeasonRulesForm } from '../components/SeasonRulesForm'
import {
    createFormInitialValues,
    SeasonRuleFormData,
    seasonRuleFormSchema,
    transformFormDataForSubmit,
} from '../utils/config'

interface UpdateSeasonRuleProps {
    params: { id: string }
}

export default function UpdateSeasonRule({ params }: UpdateSeasonRuleProps) {
    const { back } = useRouter()
    const companyId = useCurrentCompanyId()
    const queryClient = useQueryClient()

    const {
        data: seasonRule,
        queryKey,
        isLoading,
    } = useSeasonRulesControllerGetById({ companyId, id: params.id })

    const { mutateAsync: updateSeasonRule } = useSeasonRulesControllerUpdate()

    async function handleSubmit(formData: SeasonRuleFormData) {
        try {
            const apiData = transformFormDataForSubmit(formData)

            await updateSeasonRule({
                companyId,
                id: params.id,
                data: apiData,
            })

            await queryClient.invalidateQueries({ queryKey: queryKey })
            await queryClient.invalidateQueries({
                queryKey: ['searchSeasonRules'],
                refetchType: 'all',
            })

            enqueueSnackbar('Regras de temporada editadas com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch (error) {
            enqueueSnackbar(
                `Erro ao criar regras de temporada: ${getErrorMessage(error)}`,
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    autoHideDuration: 5000,
                },
            )
        }
    }

    return (
        <div className="CreateService">
            <PageHeader
                title="Editar Regra de Temporada"
                backLButtonLabel="Regras de Temporada"
                backButtonHref="/my-business/prices-and-periods/season-rules"
            />

            {!isLoading && (
                <Formik<SeasonRuleFormData>
                    initialValues={createFormInitialValues(seasonRule)}
                    validationSchema={seasonRuleFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <SeasonRulesForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
