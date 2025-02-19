'use client'

import { Flex, useToast } from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { AcomodacaoForm } from '@/components/acomodacoes/AcomodacaoForm'
import { SwitchBox } from '@/components/atoms/Input/SwitchBox'
import { PageHeader } from '@/components/organisms/PageHeader'
import { toastGenericPatchMessages } from '@/contexts/constants/toastMessages'
import { createAcomodacao } from '@/services/acomodacao/createAcomodacao'
import { CreateAcomodacaoDTO } from '@/types/Acomodacao'
import type { Status } from '@/types/Status'
import { slugify } from '@/utils/slugify'

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

            <AcomodacaoForm onSubmit={saveAcomodacao} isSaving={isSaving} />
        </div>
    )
}
