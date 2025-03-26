'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { PageHeader } from '@/components/organisms/PageHeader'

import CompanyContactsForm from './components/CompanyContactsForm'
import { ContactsData, createContactsFormInitialValues } from './utils/config'

export default function ContactsSocialMediaPage() {
    const companyId = useCurrentCompanyId()
    const toast = useToast()

    const { data: companyData, isLoading } = useGetCompanyById({
        id: companyId,
    })

    const { mutateAsync: updateCompanyContacts } = useUpdateCompany({})

    async function handleSubmit(formData: ContactsData) {
        console.log(formData)
        try {
            await updateCompanyContacts({
                id: companyId,
                data: formData,
            })

            toast({
                title: 'Formas de contato modificadas com sucesso',
                status: 'success'
            })
        } catch (erro) {
            toast({
                title: 'Erro ao modificar formas de contato',
                status: 'error'
            })
        }
    }

    return (
        <div className="CompanyContact">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Contato e Redes Sociais</PageHeader.Title>
            </PageHeader.Root>

            {!isLoading && (
                <Formik<ContactsData>
                    initialValues={createContactsFormInitialValues(companyData)}
                    onSubmit={handleSubmit}
                >
                    <CompanyContactsForm />
                </Formik>
            )}
        </div>
    )
}
