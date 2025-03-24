'use client'

import { getCompanyById, useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { PageHeader } from '@/components/organisms/PageHeader'

import {
    companyContactSchema,
    createContactsFormInitialValues,
} from './utils/config'

export default function ContactsSocialMediaPage() {
    const companyId = useCurrentCompanyId()
    const toast = useToast()

    const { data: companyData, isLoading } = useGetCompanyById({id: companyId})

    const { mutateAsync: updateCompany } = useUpdateCompany({})

    function handleSubmit() {}

    return (
        <div className="CompanyContact">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Contato e Redes Sociais</PageHeader.Title>
            </PageHeader.Root>

            {!isLoading && (
                <Formik<>
                    initialValues={createContactsFormInitialValues(companyData?.contacts)}
                    validationSchema={companyContactSchema}
                    onSubmit={handleSubmit}
                ></Formik>
            )}
        </div>
    )
}
