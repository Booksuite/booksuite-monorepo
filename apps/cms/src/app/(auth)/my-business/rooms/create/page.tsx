'use client'

import { useCreateHousingUnitType } from '@booksuite/sdk'
import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'
import { RoomsForm } from '../components/RoomsForm'
import {
    createFormInitialValues,
    RoomsFormData,
    roomsFormSchema,
    transformFormDataForSubmit,
} from '../utils/config'
export default function CreateRoom() {
    const { push } = useRouter()
    const companyId = useCurrentCompanyId()
    const queryClient = useQueryClient()

    const { mutateAsync: createHousintUnitType } = useCreateHousingUnitType()

    const toast = useToast()

    async function handleSubmit(formData: RoomsFormData) {
        try {
            const apiData = transformFormDataForSubmit(formData)

            await createHousintUnitType({
                companyId,
                data: apiData,
            })

            await queryClient.invalidateQueries({
                queryKey: ['searchHousingUnitTypes'],
                refetchType: 'all',
            })

            push('/my-business/rooms')

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
                backLButtonLabel="Acomodações"
            />

            <Formik<RoomsFormData>
                initialValues={createFormInitialValues()}
                validationSchema={roomsFormSchema}
                onSubmit={handleSubmit}
            >
                <FormikController onCancel={() => push('/my-business/rooms')}>
                    <RoomsForm />
                </FormikController>
            </Formik>
        </div>
    )
}
