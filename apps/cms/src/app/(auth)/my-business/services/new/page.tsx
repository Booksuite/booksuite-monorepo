'use client'

import { useCreateService } from '@booksuite/sdk'
import { Flex, useToast } from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { TEST_COMPANY } from '@/common/contexts/user'
import { CategoryDTO } from '@/common/dto/categoryDTO'
import type { CreateExperienceDTO, Experience } from '@/common/types/Experience'
import type { Status } from '@/common/types/Status'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'
import { DashboardExperienceForm } from '@/components/templates/DashboardExperienceForm'

export default function CreateExperienciasPage() {
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [status, setStatus] = useState<Status>('Ativo')
    const createService = useCreateService()

    const toast = useToast()

    function saveExperience(
        e: FormEvent<HTMLFormElement>,
        formData: CreateExperienceDTO | Partial<Omit<Experience, 'id'>>,
    ) {
        e.preventDefault()

        if (isSaving) {
            return
        }

        setIsSaving(true)

        const payload = { ...formData, status: status } as CreateExperienceDTO
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

            <DashboardExperienceForm
                onSubmit={saveExperience}
                isSaving={isSaving}
            />
        </div>
    )
}
