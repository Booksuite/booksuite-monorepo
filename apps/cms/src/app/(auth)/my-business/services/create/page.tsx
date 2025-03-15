'use client'

import { useCreateService } from '@booksuite/sdk'
import { Flex, useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import type { Status } from '@/common/types/Status'
import { getErrorMessage } from '@/common/utils'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { PageHeader } from '@/components/organisms/PageHeader'
import { ServiceForm } from '../components/ServiceForm'
import {
    createFormInitialValues,
    ServiceFormData,
    serviceFormSchema,
} from '../utils/config'

export default function CreateExperienciasPage() {
    const [status, setStatus] = useState<Status>('Ativo')

    const companyId = useCurrentCompanyId()

    const { mutateAsync: createService } = useCreateService()

    const toast = useToast()

    async function handleSubmit(formData: ServiceFormData) {
        console.log(formData)
        try {
            await createService({
                companyId,
                data: formData,
            })
        } catch (error) {}
    }

    return (
        <div className="CreateExperiencias">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/my-business/services">
                        Experiências
                    </PageHeader.BackLink>

                    <SwitchBox
                        label="Ativa"
                        id="status"
                        name="status"
                        defaultChecked
                        onChange={() => {
                            status === 'Ativo'
                                ? setStatus('Inativo')
                                : setStatus('Ativo')
                        }}
                        isChecked={status === 'Ativo'}
                    />
                </Flex>

                <PageHeader.Title>Criar Experiência</PageHeader.Title>
            </PageHeader.Root>

            <Formik<ServiceFormData>
                initialValues={createFormInitialValues()}
                validationSchema={serviceFormSchema}
                onSubmit={handleSubmit}
            >
                <ServiceForm />
            </Formik>
        </div>
    )
}
