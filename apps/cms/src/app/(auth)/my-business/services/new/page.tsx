'use client'

import { Flex, useToast } from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { createExperience } from '@/common/services/experience/createExperience'
import type { CreateExperienceDTO, Experience } from '@/common/types/Experience'
import type { Status } from '@/common/types/Status'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'
import { DashboardExperienceForm } from '@/components/templates/DashboardExperienceForm'

export default function CreateExperienciasPage() {
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [status, setStatus] = useState<Status>('Ativo')

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

        const response = new Promise((resolve) => {
            resolve(createExperience(payload))
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
