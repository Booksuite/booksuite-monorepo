'use client'

import {
    useGetHousingUnitTypeById,
    useUpdateHousingUnitType,
} from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'

import { RoomsForm } from '@/app/(auth)/my-business/rooms/components/RoomsForm'
import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
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
    const companyId = useCurrentCompanyId()

    const { data: room } = useGetHousingUnitTypeById({
        companyId,
        id: params.id,
    })

    const { mutateAsync: updateHousintUnitType } = useUpdateHousingUnitType()

    const toast = useToast()

    async function handleSubmit(formData: RoomsFormData) {
        try {
            // Transform the form data to the format expected by the API
            const apiData = transformFormDataForSubmit(formData)

            await updateHousintUnitType({
                id: params.id,
                companyId,
                data: apiData,
            })

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
        <div>
            <PageHeader
                title="Editar Acomodação"
                backButtonHref="/my-business/rooms"
                backLButtonLabel="Acomodações"
            />

            {!!room && (
                <Formik<RoomsFormData>
                    initialValues={createFormInitialValues(room)}
                    validationSchema={roomsFormSchema}
                    onSubmit={handleSubmit}
                >
                    <RoomsForm />
                </Formik>
            )}
        </div>
    )
}
