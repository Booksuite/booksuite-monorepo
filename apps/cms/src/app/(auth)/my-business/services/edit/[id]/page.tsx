'use client'

import { useGetServiceById } from '@booksuite/sdk'
import { Flex, Spinner, useToast } from '@chakra-ui/react'
import React, { type FormEvent, useEffect, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { updateExperience } from '@/common/services/experience/updateExperience'
import { UpdateExperienceDTO } from '@/common/types/Experience'
import type { Status } from '@/common/types/Status'
import { getErrorMessage } from '@/common/utils'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'
import { DashboardExperienceForm } from '@/components/templates/DashboardExperienceForm'

interface ServiceDetailPageProps {
    params: { id: string }
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ params }) => {
    const companyId = useCurrentCompanyId()

    const {
        data: experience,
        isLoading,
        error,
    } = useGetServiceById({ id: params.id, companyId })

    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [status, setStatus] = useState<Status>('Inativo')

    const toast = useToast()

    // Set initial status from experience data when it loads
    useEffect(() => {
        if (experience && 'status' in experience) {
            setStatus((experience.status as Status) || 'Inativo')
        }
    }, [experience])

    /**
     * Handle form submission to save experience
     */
    function saveExperience(
        e: FormEvent<HTMLFormElement>,
        formData: UpdateExperienceDTO,
    ) {
        e.preventDefault()

        if (isSaving) {
            return
        }

        setIsSaving(true)

        const payload = { ...formData, status: status } as UpdateExperienceDTO

        const response = new Promise((resolve, reject) => {
            resolve(updateExperience(params.id, payload))
        }).finally(() => {
            setIsSaving(false)
        })

        toast.promise(response, toastGenericPatchMessages)
    }

    /**
     * Toggle the status between active and inactive
     */
    const toggleStatus = () => {
        setStatus(status === 'Ativo' ? 'Inativo' : 'Ativo')
    }

    return (
        <div className="DetalhesExperiencias">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/my-business/experiencias">
                        Experiências
                    </PageHeader.BackLink>

                    {!isLoading && (
                        <SwitchBox
                            label="Ativa"
                            id="status"
                            name="status"
                            onChange={toggleStatus}
                            isChecked={status === 'Ativo'}
                        />
                    )}
                </Flex>

                <PageHeader.Title>Detalhes da Experiência</PageHeader.Title>
            </PageHeader.Root>

            {isLoading ? (
                <Spinner />
            ) : error ? (
                <p>{getErrorMessage(error, 'Erro ao carregar experiência')}</p>
            ) : (
                <DashboardExperienceForm
                    onSubmit={saveExperience}
                    data={experience as any} // Using 'any' as a temporary solution
                    isSaving={isSaving}
                />
            )}
        </div>
    )
}

export default ServiceDetailPage
