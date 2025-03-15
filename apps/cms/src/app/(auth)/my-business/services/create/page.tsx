'use client'

import { useCreateService } from '@booksuite/sdk'
import { Flex, useToast } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useState } from 'react'

import type { Status } from '@/common/types/Status'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { PageHeader } from '@/components/organisms/PageHeader'
import { DashboardExperienceForm } from '@/components/templates/DashboardExperienceForm'
import {
    createFormInitialValues,
    ServiceFormData,
    serviceFormSchema,
} from '../utils/config'

export default function CreateExperienciasPage() {
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [status, setStatus] = useState<Status>('Ativo')
    const createService = useCreateService()

    const toast = useToast()

    function handleSubmit(formData: ServiceFormData) {}

    return (
        <div className="CreateExperiencias">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/my-business/experiencias">
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
                <DashboardExperienceForm />
            </Formik>
        </div>
    )
}
