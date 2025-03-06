'use client'

import { Flex, Spinner, useToast } from '@chakra-ui/react'
import { type FormEvent, useEffect, useState } from 'react'

import { useGetExperience } from '@/common/hooks/experiences/useGetExperience'
import { updateExperience } from '@/common/services/experience/updateExperience'
import { UpdateExperienceDTO } from '@/common/types/Experience'
import type { Status } from '@/common/types/Status'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'
import { ExperienciasForm } from '@/components/templates/DashboardExperienceForm'

export default function DetalhesExperienciasPage({
    params,
}: {
    params: { id: string }
}) {
    const { isLoading, experience, error } = useGetExperience(params.id)

    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [status, setStatus] = useState<Status>(
        experience?.status ?? 'Inativo',
    )

    const toast = useToast()

    function saveExperience(
        e: FormEvent<HTMLFormElement>,
        formData: UpdateExperienceDTO,
    ) {
        e.preventDefault()

        if (isSaving) {
            return
        }

        setIsSaving(true)

        const payload = {
            ...formData,
            status: status,
        } as UpdateExperienceDTO

        const response = new Promise((resolve, reject) => {
            resolve(updateExperience(params.id, payload))
        }).finally(() => {
            setIsSaving(false)
        })

        toast.promise(response, toastGenericPatchMessages)
    }

    useEffect(() => {
        if (experience) {
            setStatus(experience.status)
        }
    }, [experience])

    return (
        <div className="DetalhesExperiencias">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/meu-negocio/experiencias">
                        Experiências
                    </PageHeader.BackLink>

                    {!isLoading && (
                        <SwitchBox
                            label="Ativa"
                            id="status"
                            name="status"
                            onChange={() => {
                                status === 'Ativo'
                                    ? setStatus('Inativo')
                                    : setStatus('Ativo')
                            }}
                            isChecked={status === 'Ativo'}
                        />
                    )}
                </Flex>

                <PageHeader.Title>Detalhes da Experiência</PageHeader.Title>
            </PageHeader.Root>

            {isLoading ? (
                <Spinner />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ExperienciasForm
                    onSubmit={saveExperience}
                    data={experience}
                    isSaving={isSaving}
                />
            )}
        </div>
    )
}
