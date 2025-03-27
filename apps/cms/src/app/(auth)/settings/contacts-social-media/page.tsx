'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import CompanyContactsForm from './components/CompanyContactsForm'
import { ContactsData, createContactsFormInitialValues } from './utils/config'

export default function ContactsSocialMediaPage() {
    const companyId = useCurrentCompanyId()
    const toast = useToast()
    const { back } = useRouter()

    const { data: companyData, isLoading } = useGetCompanyById({
        id: companyId,
    })

    const { mutateAsync: updateCompanyContacts } = useUpdateCompany({})

    async function handleSubmit(formData: ContactsData) {
        try {
            await updateCompanyContacts({
                id: companyId,
                data: formData,
            })

            toast({
                title: 'Formas de contato modificadas com sucesso',
                status: 'success',
            })
        } catch (error) {
            toast({
                title: 'Erro ao modificar formas de contato',
                description: getErrorMessage(error),
                status: 'error',
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
                    initialValues={createContactsFormInitialValues(
                        companyData?.contacts,
                    )}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <CompanyContactsForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
