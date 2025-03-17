'use client'

import { useCreateHousingUnitType } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { Formik } from 'formik'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { PageHeader } from '@/components/organisms/PageHeader'
import { RoomsForm } from '../components/RoomsForm'
import {
    createFormInitialValues,
    RoomsFormData,
    roomsFormSchema,
} from '../utils/config'

export default function CreateRoom() {
    const companyId = useCurrentCompanyId()

    const { mutateAsync: createHousintUnitType } = useCreateHousingUnitType()

    const toast = useToast()

    async function handleSubmit(formData: RoomsFormData) {
        try {
            await createHousintUnitType({
                companyId,
                data: formData,
            })

            toast({
                title: 'Acomodação criada com sucesso',
                status: 'success',
            })
        } catch (error) {
            toast({
                title: 'Erro ao criar acomodação',
                description: getErrorMessage(error),
                status: 'error',
            })
        }
    }

    return (
        <div>
            <PageHeader
                title="Criar Acomodação"
                backButtonHref="/my-business/rooms"
                backLButtonLabel="Acomodações"
            />

            <Formik<RoomsFormData>
                initialValues={createFormInitialValues()}
                validationSchema={roomsFormSchema}
                onSubmit={handleSubmit}
            >
                <RoomsForm />
            </Formik>
        </div>
    )
}
