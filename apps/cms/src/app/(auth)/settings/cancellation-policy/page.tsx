'use client'

import {
    useGetCompanyCancellationPolicy,
    useUpsertCompanyCancellationPolicy,
} from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { useEffect } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { CancellationPolicyForm } from './components/CancellationPolicyForm'
import {
    CancellationPolicyFormData,
    cancellationPolicyFormSchema,
    createCancellationPolicyInitialValues,
} from './utils/config'

function CancellationPolicyContent() {
    const companyId = useCurrentCompanyId()
    const { enqueueSnackbar } = useSnackbar()
    const { back } = useRouter()
    const queryClient = useQueryClient()

    const {
        data: cancellatonPolicyData,
        isLoading,
        queryKey,
    } = useGetCompanyCancellationPolicy({ companyId })

    const { mutateAsync: updateCancellationPolicy } =
        useUpsertCompanyCancellationPolicy()

    async function handleSubmit(formData: CancellationPolicyFormData) {
        try {
            await updateCancellationPolicy({
                companyId,
                data: formData,
            })

            await queryClient.invalidateQueries({ queryKey })

            enqueueSnackbar(
                'Políticas de Cancelamento modificadas com sucesso',
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
        } catch (error) {
            enqueueSnackbar(
                `Erro ao modificar políticas: ${getErrorMessage(error)}`,
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

    useEffect(() => {
        if (!isLoading && !cancellatonPolicyData) {
            enqueueSnackbar('Erro ao cargar políticas de cancelamento', {
                variant: 'error',
            })
        }
    }, [isLoading, cancellatonPolicyData, enqueueSnackbar])

    return (
        <div className="cancellation_policy">
            <PageHeader
                title="Políticas de Cancelamento"
                backLButtonLabel="Configurações"
                isLoading={isLoading}
            />

            {!isLoading && (
                <Formik<CancellationPolicyFormData>
                    initialValues={createCancellationPolicyInitialValues(
                        cancellatonPolicyData,
                    )}
                    validationSchema={cancellationPolicyFormSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    <FormikController onCancel={() => back()}>
                        <CancellationPolicyForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}

export default function CancellationPolicy() {
    return (
        <SnackbarProvider maxSnack={3}>
            <CancellationPolicyContent />
        </SnackbarProvider>
    )
}
