'use client'

import { useGetServiceById } from '@booksuite/sdk'
import { Flex, Spinner, useToast } from '@chakra-ui/react'
import React, { type FormEvent, useEffect, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { updateService } from '@/common/services/service/updateService'
import { UpdateServiceDTO } from '@/common/types/Service'
import type { Status } from '@/common/types/Status'
import { getErrorMessage } from '@/common/utils'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'
import { DashboardServiceForm } from '@/components/templates/DashboardServiceForm'

interface ServiceDetailPageProps {
    params: {
        id: string
    }
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ params }) => {
    const companyId = useCurrentCompanyId()

    const {
        data: Service,
        isLoading,
        error,
    } = useGetServiceById({ id: params.id, companyId })

    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [status, setStatus] = useState<Status>('Inativo')

    const toast = useToast()

    // Set initial status from Service data when it loads
    useEffect(() => {
        if (Service && 'status' in Service) {
            setStatus((Service.status as Status) || 'Inativo')
        }
    }, [Service])

    /**
     * Handle form submission to save Service
     */
    function saveService(
        e: FormEvent<HTMLFormElement>,
        formData: UpdateServiceDTO,
    ) {
        e.preventDefault()

        if (isSaving) {
            return
        }

        setIsSaving(true)

        const payload = {
            ...formData,
            status: status,
        } as UpdateServiceDTO

        const response = new Promise((resolve, reject) => {
            resolve(updateService(params.id, payload))
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
                <DashboardServiceForm
                    onSubmit={saveService}
                    data={Service as any} // Using 'any' as a temporary solution
                    isSaving={isSaving}
                />
            )}
        </div>
    )
}

export default ServiceDetailPage
