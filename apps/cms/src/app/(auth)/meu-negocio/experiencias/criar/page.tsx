'use client'

import { Flex, useToast } from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { SwitchBox } from '@/components/atoms/SwitchBox'
import { ExperienciasForm } from '@/components/experiencias/ExperienciasForm'
import { PageHeader } from '@/components/organisms/PageHeader'
import { toastGenericPatchMessages } from '@/contexts/constants/toastMessages'
import { createExperience } from '@/services/experience/createExperience'
import type { CreateExperienceDTO } from '@/types/Experience'
import type { Status } from '@/types/Status'

export default function CreateExperienciasPage() {
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [status, setStatus] = useState<Status>('Ativo')

    const toast = useToast()

    function saveExperience(
        e: FormEvent<HTMLFormElement>,
        formData: CreateExperienceDTO,
    ) {
        e.preventDefault()

        if (isSaving) {
            return
        }

        setIsSaving(true)

        const payload = {
            ...formData,
            status: status,
        } as CreateExperienceDTO

        const response = new Promise((resolve, reject) => {
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
                    <PageHeader.BackLink href="/meu-negocio/experiencias">
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

            <ExperienciasForm onSubmit={saveExperience} isSaving={isSaving} />
        </div>
    )
}
