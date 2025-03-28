'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { AddressForm } from './components/AddressForm'
import {
    AddressFormData,
    addressFormSchema,
    createAddressInitialValues,
} from './utils/config'

export default function Address() {
    const companyId = useCurrentCompanyId()
    const toast = useToast()
    const { back } = useRouter()

    const { data: companyData, isLoading } = useGetCompanyById({
        id: companyId,
    })

    const { mutateAsync: updateCompanyAddress } = useUpdateCompany()

    async function handleSubmit(formData: AddressFormData) {
        try {
            await updateCompanyAddress({
                id: companyId,
                data: formData,
            })

            toast({
                title: 'Endereço modificado com sucesso',
                status: 'success',
            })

            back()
        } catch (error) {
            toast({
                title: 'Erro ao editar Endereço',
                description: getErrorMessage(error),
                status: 'error',
            })
        }
    }

    return (
        <div className="address">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Endereço</PageHeader.Title>
            </PageHeader.Root>

            {!isLoading && (
                <Formik<AddressFormData>
                    initialValues={createAddressInitialValues(companyData)}
                    validationSchema={addressFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <AddressForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
