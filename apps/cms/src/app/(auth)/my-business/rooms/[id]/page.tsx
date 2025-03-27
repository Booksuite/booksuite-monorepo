'use client'

import {
    useGetHousingUnitTypeById,
    useUpdateHousingUnitType,
} from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { RoomsForm } from '@/app/(auth)/my-business/rooms/components/RoomsForm'
import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
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

    const {
        data: room,
        queryKey,
        isLoading,
    } = useGetHousingUnitTypeById({
        companyId,
        id: params.id,
    })

    const { mutateAsync: updateHousintUnitType } = useUpdateHousingUnitType()

    const toast = useToast()

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

            toast({
                title: 'Acomodação editada com sucesso',
                status: 'success',
            })
        } catch (error) {
            toast({
                title: 'Erro ao editar acomodação',
                description: getErrorMessage(error),
                status: 'error',
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
