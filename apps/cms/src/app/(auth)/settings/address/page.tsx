'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

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
    const { enqueueSnackbar } = useSnackbar()
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

            enqueueSnackbar('Endereço modificado com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch (error) {
            enqueueSnackbar(
                `Erro ao modificar endereço: ${getErrorMessage(error)}`,
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
