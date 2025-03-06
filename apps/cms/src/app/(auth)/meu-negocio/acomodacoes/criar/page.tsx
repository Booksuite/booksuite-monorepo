'use client'

import { Flex, useToast } from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { createAcomodacao } from '@/common/services/acomodacao/createAcomodacao'
import { CreateAcomodacaoDTO } from '@/common/types/Acomodacao'
import type { Status } from '@/common/types/Status'
import { slugify } from '@/common/utils/slugify'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'
import { DahboardAccommodationForm } from '@/components/templates/DahboardAccommodationForm'

export default function PageCreateAcomodacao() {
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [status, setStatus] = useState<Status>('Ativo')

    const toast = useToast()

    function saveAcomodacao(
        e: FormEvent<HTMLFormElement>,
        formData: CreateAcomodacaoDTO,
    ) {
        e.preventDefault()

        if (isSaving) {
            return
        }

        setIsSaving(true)

        const payload = {
            ...formData,
            slug: slugify(formData.name),
            // status: status,
        } as CreateAcomodacaoDTO

        const response = new Promise((resolve, reject) => {
            resolve(createAcomodacao(payload))
        }).finally(() => {
            setIsSaving(false)
        })

        toast.promise(response, toastGenericPatchMessages)
    }

    return (
        <div className="CreateAcomodacao">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/meu-negocio/acomodacoes">
                        Acomodações
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

                <PageHeader.Title>Criar Acomodacao</PageHeader.Title>
            </PageHeader.Root>

            <DahboardAccommodationForm
                onSubmit={saveAcomodacao}
                isSaving={isSaving}
            />
        </div>
    )
}
