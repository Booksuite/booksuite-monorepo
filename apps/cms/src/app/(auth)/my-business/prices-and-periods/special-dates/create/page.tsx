'use client'

import { useCreateSpecialDate } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { SpecialDateForm } from '../components/SpecialDateForm'
import {
    createSpecialDateFormInitialValues,
    SpecialDateFormData,
    specialDateFormSchema,
    transformSpecialDateFormDataForSubmit,
} from '../utils/config'

export default function CreateSpecialDatePage() {
    const companyId = useCurrentCompanyId()
    const { back } = useRouter()
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar()
    const { mutateAsync: createSpecialDate } = useCreateSpecialDate()

    async function handleSubmit(formData: SpecialDateFormData) {
        try {
            const apiData = transformSpecialDateFormDataForSubmit(formData)

            await createSpecialDate({
                companyId,
                data: {
                    ...apiData,
                    visibilityStartDate: apiData.startDate,
                    medias: apiData.medias.map((media) => ({
                        ...media,
                        order: media.order ?? undefined,
                    })),
                },
            })

            enqueueSnackbar('Data especial criada com sucesso!', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                autoHideDuration: 3000,
            })

            await queryClient.invalidateQueries({
                queryKey: ['searchSpecialDates'],
                refetchType: 'all',
            })

            back()
        } catch {
            enqueueSnackbar(`Erro ao criar data especial `, {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                autoHideDuration: 5000,
            })
        }
    }

    return (
        <>
            <PageHeader
                title="Criar Data Especial"
                backLButtonLabel="Datas Especiais"
            />

            <Formik<SpecialDateFormData>
                initialValues={createSpecialDateFormInitialValues()}
                validationSchema={specialDateFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => back()}>
                    <SpecialDateForm />
                </FormikController>
            </Formik>
        </>
    )
}
