'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { PageHeader } from '@/components/organisms/PageHeader'

import { GeneralDataForm } from './components/GeneralDataForm'
import {
    createFormInitialValues,
    GeneralData,
    generalDataSchema,
} from './utils/config'

export default function GeneralDataPage() {
    const companyId = useCurrentCompanyId()

    const { data: companyGeneralData, isLoading } = useGetCompanyById({
        id: companyId,
    })

    const { mutateAsync: updateCompany } = useUpdateCompany()

    const toast = useToast()

    async function handleSubmit(formData: GeneralData) {
        console.log(formData)
        try {
            await updateCompany({
                id: companyId,
                data: formData,
            })

            toast({
                title: 'Acomodação editada com sucesso',
                status: 'success',
            })
        } catch (error) {
            toast({
                title: 'Erro ao editar acomodação',
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
                <Formik<GeneralData>
                    initialValues={createFormInitialValues(companyGeneralData)}
                    validationSchema={generalDataSchema}
                    onSubmit={handleSubmit}
                >
                    <GeneralDataForm />
                </Formik>
            )}
        </div>
    )
}
