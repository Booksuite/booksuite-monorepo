'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { TaxInformationForm } from './components/TaxInformationForm'
import {
    createTaxInformationInitialValues,
    TaxInformationData,
    taxInformationSchema,
} from './utils/config'

export default function TaxInformation() {
    const companyId = useCurrentCompanyId()
    const toast = useToast()
    const { back } = useRouter()

    const queryClient = useQueryClient()

    const { data: TaxInformationData, queryKey, isLoading } = useGetCompanyById({
        id: companyId,
    })

    const { mutateAsync: updateCompanyTaxInformation } = useUpdateCompany()

    async function handleSubmit(formData: TaxInformationData) {
        console.log(formData)
        try {
            await updateCompanyTaxInformation({
                id: companyId,
                data: formData,
            })
            toast({
                title: 'Informações Fiscais modificadas com sucesso',
                status: 'success',
            })

            await queryClient.invalidateQueries({ queryKey: queryKey })
            await queryClient.invalidateQueries({
                queryKey: ['getCompanyById'],
                refetchType: 'all',
            })

            back()
        } catch (error) {
            toast({
                title: 'Erro ao modificar informações fiscais',
                description: getErrorMessage(error),
                status: 'error',
            })
        }
    }

    return (
        <div className="tax_information">
            <PageHeader
                title="Informações Fiscais"
                backLButtonLabel="Configurações"
                isLoading={isLoading}
            />

            <Formik<TaxInformationData>
                initialValues={createTaxInformationInitialValues(
                    TaxInformationData,
                )}
                validationSchema={taxInformationSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => back()}>
                    <TaxInformationForm />
                </FormikController>
            </Formik>
        </div>
    )
}
