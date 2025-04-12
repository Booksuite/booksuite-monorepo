'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import CompanyContactsForm from './components/CompanyContactsForm'
import { ContactsData, createContactsFormInitialValues } from './utils/config'

export default function ContactsSocialMediaPage() {
    const companyId = useCurrentCompanyId()
    const { enqueueSnackbar } = useSnackbar()
    const { back } = useRouter()
    const queryClient = useQueryClient()

    const {
        data: companyData,
        isLoading,
        queryKey,
    } = useGetCompanyById({
        id: companyId,
    })

    const { mutateAsync: updateCompanyContacts } = useUpdateCompany({})

    async function handleSubmit(formData: ContactsData) {
        try {
            await updateCompanyContacts({
                id: companyId,
                data: {
                    contacts: [
                        ...formData.email,
                        ...formData.phone,
                        ...formData.socialMedias,
                    ],
                },
            })
            await queryClient.invalidateQueries({ queryKey: queryKey })

            enqueueSnackbar(
                'Contatos e/ou redes sociais modificados com sucesso',
                {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    autoHideDuration: 3000,
                },
            )

            back()
        } catch {
            enqueueSnackbar(
                `Erro ao modificar os contatos e/ou redes sociais`,
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    autoHideDuration: 5000,
                },
            )
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
