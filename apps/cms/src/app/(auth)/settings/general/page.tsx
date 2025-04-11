'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { GeneralForm } from './components/GeneralDataForm'
import {
    createFormInitialValues,
    GeneralDataForm,
    generalDataSchema,
    transformFormDataForSubmit,
} from './utils/config'

export default function GeneralDataPage() {
    const queryClient = useQueryClient()
    const companyId = useCurrentCompanyId()
    const { enqueueSnackbar } = useSnackbar()
    const { back } = useRouter()

    const {
        data: companyGeneralData,
        isLoading,
        queryKey,
    } = useGetCompanyById({
        id: companyId,
    })

    const { mutateAsync: updateCompany } = useUpdateCompany()

    async function handleSubmit(formData: GeneralDataForm) {
        try {
            if (!companyGeneralData) return

            const transformedFormData = transformFormDataForSubmit(
                formData,
                companyGeneralData,
            )

            await updateCompany({
                id: companyId,
                data: transformedFormData,
            })

            await queryClient.invalidateQueries({
                queryKey: queryKey,
                refetchType: 'all',
            })

            enqueueSnackbar('Dados gerais modificadas com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch {
            enqueueSnackbar(`Erro ao modificar os dados gerais`, {
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
        <div className="GeneralData">
            <PageHeader
                title="Dados Gerais"
                backLButtonLabel="Configurações"
                backButtonHref="/settings"
                isLoading={isLoading}
            />

            {companyGeneralData && (
                <Formik<GeneralDataForm>
                    initialValues={createFormInitialValues(companyGeneralData)}
                    validationSchema={generalDataSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <GeneralForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
