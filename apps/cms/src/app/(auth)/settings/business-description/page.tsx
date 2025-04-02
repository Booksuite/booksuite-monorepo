'use client'

import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { BusinessDescriptionForm } from './components/BusinessDescriptionForm'
import {
    BusinessDescriptionFormData,
    businessDescriptionFormSchema,
    businessDescriptionInitialValues,
} from './utils/config'

export default function BusinessDescription() {
    const { back } = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    function handleSubmit() {
        try {
            enqueueSnackbar('Descrição do negócio modificado com sucesso', {
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
                `Erro ao modificar a descrição do negócio: ${getErrorMessage(error)}`,
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
        <div className="business_description">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Descrição do Negócio</PageHeader.Title>
            </PageHeader.Root>

            <Formik<BusinessDescriptionFormData>
                initialValues={businessDescriptionInitialValues()}
                validationSchema={businessDescriptionFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => back()}>
                    <BusinessDescriptionForm />
                </FormikController>
            </Formik>
        </div>
    )
}
