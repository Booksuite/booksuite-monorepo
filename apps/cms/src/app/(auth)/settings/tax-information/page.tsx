'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
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

    const router = useRouter()

    const { data: TaxInformationData } = useGetCompanyById({ id: companyId })

    const { mutateAsync: updateCompanyTaxInformation } = useUpdateCompany()

    async function handleSubmit(formData: TaxInformationData) {
        try {
            await updateCompanyTaxInformation({
                id: companyId,
                data: formData,
            })
            toast({
                title: 'Informações Fiscais modificadas com sucesso',
                status: 'success',
            })

            router.push('/settings')
        } catch (erro) {
            toast({
                title: 'Erro ao modificar informações fiscais',
                status: 'error',
            })
        }
    }

    return (
        <div className="tax_information">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Informações Fiscais</PageHeader.Title>

                <Formik<TaxInformationData>
                    initialValues={createTaxInformationInitialValues(
                        TaxInformationData,
                    )}
                    validationSchema={taxInformationSchema}
                    onSubmit={handleSubmit}
                >
                    <TaxInformationForm />
                </Formik>
            </PageHeader.Root>
        </div>
    )
}
