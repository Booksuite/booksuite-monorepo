'use client'

import { useGetSpecialDateById, useUpdateSpecialDate } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { SpecialDateForm } from '../components/SpecialDateForm'
import {
    createSpecialDateFormInitialValues,
    SpecialDateFormData,
    specialDateFormSchema,
    transformSpecialDateFormDataForSubmit,
} from '../utils/config'

interface EditSpecialDateProps {
    params: { id: string }
}

export default function EditSpecialDate({ params }: EditSpecialDateProps) {
    const { back } = useRouter()
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar()

    const {
        data: specialDate,
        queryKey,
        isLoading,
    } = useGetSpecialDateById({ id: params.id })

    const { mutateAsync: updateSpecialDate } = useUpdateSpecialDate()

    async function handleSubmit(formData: SpecialDateFormData) {
        try {
            const apiData = transformSpecialDateFormDataForSubmit(formData)

            await updateSpecialDate({
                id: params.id,
                data: {
                    ...apiData,
                    medias: apiData.medias.map((media) => ({
                        ...media,
                        order: media.order ?? undefined,
                    })),
                },
            })

            await queryClient.invalidateQueries({ queryKey })
            await queryClient.invalidateQueries({
                queryKey: ['searchSpecialDate'],
                refetchType: 'all',
            })

            back()

            enqueueSnackbar('Data especial atualizada com sucesso!', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                autoHideDuration: 3000,
            })
        } catch {
            enqueueSnackbar('Erro ao atualizar data especial', {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                autoHideDuration: 5000,
            })
        }
    }

    return (
        <>
            <PageHeader
                title="Editar Data Especial"
                backLButtonLabel="Datas Especiais"
                isLoading={isLoading}
            />

            {!!specialDate && (
                <Formik<SpecialDateFormData>
                    initialValues={createSpecialDateFormInitialValues(
                        specialDate,
                    )}
                    validationSchema={specialDateFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <SpecialDateForm />
                    </FormikController>
                </Formik>
            )}
        </>
    )
}
