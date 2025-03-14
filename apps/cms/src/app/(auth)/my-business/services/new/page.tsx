'use client'

import { useCreateService } from '@booksuite/sdk'
import { Flex, useToast } from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { TEST_COMPANY } from '@/common/contexts/user'
import { CategoryDTO } from '@/common/dto/categoryDTO'
import type { CreateServiceDTO, Service } from '@/common/types/Service'
import type { Status } from '@/common/types/Status'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'
import { DashboardServiceForm } from '@/components/templates/DashboardServiceForm'

export default function CreateExperienciasPage() {
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [status, setStatus] = useState<Status>('Ativo')
    const createService = useCreateService()

    const toast = useToast()

    function saveService(
        e: FormEvent<HTMLFormElement>,
        formData: CreateServiceDTO | Partial<Omit<Service, 'id'>>,
    ) {
        e.preventDefault()

        if (isSaving) {
            return
        }

        setIsSaving(true)

        const payload = { ...formData, status: status } as CreateServiceDTO
        console.log(payload)

        const category: CategoryDTO[] = []

        const response = new Promise((resolve, reject) => {
            resolve(
                createService.mutate({
                    companyId: TEST_COMPANY,
                    data: {
                        ...payload,
                        published: status === 'Ativo',
                        adults: 1,
                        category: [],
                        included: 'test',
                        medias: [],
                    },
                }),
            )
        }).finally(() => {
            setIsSaving(false)
        })

        toast.promise(response, toastGenericPatchMessages)
    }

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

            <DashboardServiceForm onSubmit={saveService} isSaving={isSaving} />
        </div>
    )
}
