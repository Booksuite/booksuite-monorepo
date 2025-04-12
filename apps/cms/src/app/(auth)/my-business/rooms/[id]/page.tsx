'use client'

import {
    useGetHousingUnitTypeById,
    useUpdateHousingUnitType,
} from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { RoomsForm } from '@/app/(auth)/my-business/rooms/components/RoomsForm'
import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import {
    createFormInitialValues,
    RoomsFormData,
    roomsFormSchema,
    transformFormDataForSubmit,
} from '../utils/config'

interface UpdateRoomProps {
    params: { id: string }
}

export default function UpdateRoom({ params }: UpdateRoomProps) {
    const { back } = useRouter()
    const companyId = useCurrentCompanyId()
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar()

    const {
        data: room,
        queryKey,
        isLoading,
    } = useGetHousingUnitTypeById({
        companyId,
        id: params.id,
    })

    const { mutateAsync: updateHousintUnitType } = useUpdateHousingUnitType()

    async function handleSubmit(formData: RoomsFormData) {
        try {
            const apiData = transformFormDataForSubmit(formData)

            await updateHousintUnitType({
                id: params.id,
                companyId,
                data: apiData,
            })

            await queryClient.invalidateQueries({ queryKey: queryKey })
            await queryClient.invalidateQueries({
                queryKey: ['searchHousingUnitTypes'],
                refetchType: 'all',
            })

            back()

            enqueueSnackbar('Acomodação criada com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })
        } catch {
            enqueueSnackbar(`Erro ao criar acomodação`, {
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
                title="Editar Acomodação"
                backLButtonLabel="Acomodações"
                isLoading={isLoading}
            />

            {!!room && (
                <Formik<RoomsFormData>
                    initialValues={createFormInitialValues(room)}
                    validationSchema={roomsFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <RoomsForm />
                    </FormikController>
                </Formik>
            )}
        </>
    )
}
