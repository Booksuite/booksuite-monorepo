'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { GeneralForm } from './components/GeneralDataForm'
import {
    createFormInitialValues,
    GeneralDataForm,
    generalDataSchema,
} from './utils/config'

export default function GeneralDataPage() {
    const companyId = useCurrentCompanyId()
    const { back } = useRouter()

    const { data: companyGeneralData, isLoading } = useGetCompanyById({
        id: companyId,
    })

    const { mutateAsync: updateCompany } = useUpdateCompany()

    const toast = useToast()

    async function handleSubmit(formData: GeneralDataForm) {
        try {
            await updateCompany({
                id: companyId,
                data: formData,
            })

            toast({
                title: 'Dados gerais modificados com sucesso ',
                status: 'success',
            })

            back()
        } catch (error) {
            toast({
                title: 'Erro ao editar dados gerais',
                description: getErrorMessage(error),
                status: 'error',
            })
        }
    }

    return (
        <div className="GeneralData">
            <PageHeader
                title="Dados Gerais"
                backLButtonLabel="Configurações"
                backButtonHref="/settings"
            />

            {!isLoading && (
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
