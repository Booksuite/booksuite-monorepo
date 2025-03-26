'use client'

import { useUpdateCompany } from '@booksuite/sdk'
import { Formik } from 'formik'

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

    const { data: TaxInformationData } = useUpdateCompany()

    async function handleSubmit(formData: TaxInformationData) {}

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
