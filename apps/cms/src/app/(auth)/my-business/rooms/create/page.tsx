'use client'

import { useCreateHousingUnitType } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
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
    const { enqueueSnackbar } = useSnackbar()

    const { mutateAsync: createHousintUnitType } = useCreateHousingUnitType()

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
