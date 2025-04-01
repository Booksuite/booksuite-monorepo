'use client'

import { useGetCompanyById, useUpdateCompany } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

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
    const { enqueueSnackbar } = useSnackbar()
    const { back } = useRouter()

    const queryClient = useQueryClient()

    const {
        data: TaxInformationData,
        queryKey,
        isLoading,
    } = useGetCompanyById({
        id: companyId,
    })

    const { mutateAsync: updateCompanyTaxInformation } = useUpdateCompany()

    async function handleSubmit(formData: TaxInformationData) {
        try {
            await updateCompanyTaxInformation({
                id: companyId,
                data: formData,
            })
            enqueueSnackbar('Informações fiscais modificadas com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            await queryClient.invalidateQueries({ queryKey: queryKey })
            await queryClient.invalidateQueries({
                queryKey: ['getCompanyById'],
                refetchType: 'all',
            })

            back()
        } catch (error) {
            enqueueSnackbar(
                `Erro ao modificar informações: ${getErrorMessage(error)}`,
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
