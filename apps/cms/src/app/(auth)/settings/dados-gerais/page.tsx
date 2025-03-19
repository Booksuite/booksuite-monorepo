'use client'

import { getCompanyByIdQueryKey, useGetCompanyById } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
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

    const toast = useToast()

    function handleSubmit(e: GeneralData) {}

    return (
        <div className="GeneralData">
            <PageHeader
                title="Dados Gerais"
                backLButtonLabel="Configurações"
                backButtonHref="/configuracoes"
            />

            {isLoading ? (
                <Formik<GeneralData>
                    initialValues={createFormInitialValues(companyGeneralData)}
                    validationSchema={generalDataSchema}
                    onSubmit={handleSubmit}
                >
                    <GeneralDataForm />
                </Formik>
            ) : undefined}
        </div>
    )
}
