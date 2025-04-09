'use client'

import { useUtilityLinksControllerCreate } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { UtilityLinksForm } from '../components/UtilityLinksForm'
import {
    createUtilityLinksInitialValues,
    UtilityLinkData,
    utilityLinksFormSchema,
} from '../utils/config'

export default function CreateUtilityLink() {
    const companyId = useCurrentCompanyId()
    const { back } = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const queryClient = useQueryClient()

    const { mutateAsync: createUtilityLink } = useUtilityLinksControllerCreate()

    async function handleSubmit(formData: UtilityLinkData) {
        try {
            await createUtilityLink({ companyId, data: formData })

            enqueueSnackbar('Link criado com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch {
            enqueueSnackbar('Ocorreu um erro ao criar link', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
        }
    }

    return (
        <div className="CreaeUtilityLink">
            <PageHeader title="Detalhes do Link" backLButtonLabel="Link Bio" />

            <Formik<UtilityLinkData>
                initialValues={createUtilityLinksInitialValues()}
                validationSchema={utilityLinksFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => back()}>
                    <UtilityLinksForm />
                </FormikController>
            </Formik>
        </div>
    )
}
