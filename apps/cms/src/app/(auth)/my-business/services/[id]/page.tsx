'use client'

import { useGetServiceById, useUpdateService } from '@booksuite/sdk'
import { Flex, Spinner, useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { type FormEvent, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { updateExtra } from '@/common/services/extra/updateExtra'
import { UpdateExtraDTO } from '@/common/types/Extra'
import { getErrorMessage } from '@/common/utils'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'
import { DashboardExperienceForm } from '@/components/templates/DashboardExperienceForm'
import { DashboardExtraForm } from '@/components/templates/DashboardExtraForm'
import { createFormInitialValues, ServiceFormData, serviceFormSchema } from '../utils/config'

export default function UpdateService({
    params,
}: {
    params: { id: string }
}) {
    const companyId = useCurrentCompanyId()

    const {data: service} = useGetServiceById({
        companyId,
        id: params.id
    })

    const {mutateAsync: updateService} = useUpdateService()

    const toast = useToast()

    async function handleSubmit(
        formData: ServiceFormData
    ) {
    try{
        await updateService({
                    companyId,
                    data: formData,
                    id: params.id
                })
    
                toast({
                    title: 'Experiência modificada com sucesso',
                    status: 'success'
                })
            }catch(error){
                toast({
                    title: 'Erro ao modificar experiência',
                    description: getErrorMessage(error),
                    status: 'error',
                })
            }
    }

    return (
        <div>
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/my-business/extras">
                        Extras
                    </PageHeader.BackLink>

                    <SwitchBox
                        label="Ativa"
                        id="status"
                        name="status"
                        defaultChecked
                    />
                </Flex>

                <PageHeader.Title>Detalhes do Extra</PageHeader.Title>
            </PageHeader.Root>

            {!!service && 
            ( <Formik<ServiceFormData>
                            initialValues={createFormInitialValues(service)}
                            validationSchema={serviceFormSchema}
                            onSubmit={handleSubmit}
                        >
                        <DashboardExperienceForm />
                        </Formik>
            )}
        </div>
    )
}
