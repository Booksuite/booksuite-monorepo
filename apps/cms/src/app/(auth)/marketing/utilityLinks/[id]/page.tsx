'use client'

import {
    useGetUtilityLink,
    useUtilityLinksControllerUpdate,
} from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { UtilityLinksForm } from '../components/UtilityLinksForm'
import {
    createUtilityLinksInitialValues,
    UtilityLinkData,
    utilityLinksFormSchema,
} from '../utils/config'

interface UpdateUtilityLinkProps {
    params: { id: string }
}

export default function UpdateUtilityLink({ params }: UpdateUtilityLinkProps) {
    const { back } = useRouter()
    const companyId = useCurrentCompanyId()
    const queryClient = useQueryClient()

    const {
        data: utilityLink,
        isLoading,
        queryKey,
    } = useGetUtilityLink({
        companyId,
        id: params.id,
    })

    const { mutateAsync: updateUtilityLink } = useUtilityLinksControllerUpdate()

    async function handleSubmit(formData: UtilityLinkData) {
        try {
            await updateUtilityLink({
                id: params.id,
                data: formData,
                companyId,
            })
            
            await queryClient.invalidateQueries({ queryKey: queryKey })
            await queryClient.invalidateQueries({
                queryKey: ['searchUtilityLinks'],
                refetchType: 'all',
            })

            enqueueSnackbar('Link editado com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch {
            enqueueSnackbar('Erro ao editar link', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        }
    }
    return (
        <div className="EditUtilityLink">
            <PageHeader
                title="Editar Link"
                backLButtonLabel="Link Bio"
                backButtonHref="/marketing/utilityLinks"
            />

            {!isLoading && (
                <Formik<UtilityLinkData>
                    initialValues={createUtilityLinksInitialValues(utilityLink)}
                    validationSchema={utilityLinksFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <UtilityLinksForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
