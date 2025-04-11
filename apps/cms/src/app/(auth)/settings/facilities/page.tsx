'use client'

import { useGetCompanyById, useUpdateFacility } from '@booksuite/sdk'
import { useQueryClient } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { FormikController } from '@/components/molecules/FormikController'
import { PageHeader } from '@/components/organisms/PageHeader'

import { FacilitiesForm } from './components/FacilitiesForm'
import {
    createFacilitiesInitialValues,
    FacilitiesFormData,
    facilitiesFormSchema,
} from './utils/config'

export default function Facilities() {
    const companyId = useCurrentCompanyId()
    const { enqueueSnackbar } = useSnackbar()
    const { back } = useRouter()
    const queryClient = useQueryClient()

    const {
        data: companyData,
        isLoading,
        queryKey,
    } = useGetCompanyById(companyId)

    const { mutateAsync: updateFacilities } = useUpdateFacility()

    async function handleSubmit(formData: FacilitiesFormData) {
        try {
            await Promise.all(
                formData.facilities.map(async (facilityInput) => {
                    await updateFacilities({
                        id: facilityInput.facilityId,
                        data: facilityInput.isFeatured,
                    })
                }),
            )

            await queryClient.invalidateQueries({ queryKey })

            enqueueSnackbar('Comodidades atualizadas com sucesso', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000,
            })

            back()
        } catch {
            enqueueSnackbar('Erro ao atualizar comodidades', {
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
        <div className="facilities">
            <PageHeader.Root>
                <PageHeader.BackLink href="/settings">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Comodidades</PageHeader.Title>
            </PageHeader.Root>

            {!isLoading && (
                <Formik<FacilitiesFormData>
                    initialValues={createFacilitiesInitialValues(companyData)}
                    validationSchema={facilitiesFormSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikController onCancel={() => back()}>
                        <FacilitiesForm />
                    </FormikController>
                </Formik>
            )}
        </div>
    )
}
