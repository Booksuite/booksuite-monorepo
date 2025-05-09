'use client'

import {
    SpecialDateFull,
    useGetSpecialDateById,
    useUpdateSpecialDate,
} from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

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

interface UpdateSeasonRuleProps {
    params: { id: string }
}

export default function UpdateSeasonRule({ params }: UpdateSeasonRuleProps) {
    const { back } = useRouter()
    const queryClient = useQueryClient()
    const companyId = useCurrentCompanyId()

    const {
        data: specialDate,
        queryKey,
        isLoading,
    } = useGetSpecialDateById({ id: params.id, companyId })

    const { mutateAsync: updateSpecialDate } = useUpdateSpecialDate()

    async function handleSubmit(formData: SpecialDateFormData) {
        try {
            const apiData = transformSpecialDateFormDataForSubmit(formData)

            await updateSpecialDate({
                id: params.id,
                companyId,
                data: apiData,
            })

            await queryClient.invalidateQueries({ queryKey: queryKey })
            await queryClient.invalidateQueries({
                queryKey: ['searchSpecialDates'],
                refetchType: 'all',
            })

            enqueueSnackbar('Data especial editada com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch {
            enqueueSnackbar(`Erro ao editar data especial`, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 5000,
            })
        }
    }

    return (
        <>
            <PageHeader
                title="Editar Data Especial"
                backLButtonLabel="Datas Especiais"
                backButtonHref="/my-business/prices-and-periods/special-dates"
            />

            {!isLoading && (
                <Formik<SpecialDateFormData>
                    initialValues={createSpecialDateFormInitialValues(
                        specialDate as SpecialDateFull,
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
