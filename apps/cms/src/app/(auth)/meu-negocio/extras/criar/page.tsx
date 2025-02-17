'use client'

import { Flex, useToast } from '@chakra-ui/react'
import { type FormEvent,useState } from 'react'

import { ExtraForm } from '@/components/extras/ExtraForm'
import { SwitchBox } from '@/components/shared/form/SwitchBox'
import { PageHeader } from '@/components/shared/PageHeader'
import { toastGenericPatchMessages } from '@/contexts/constants/toastMessages'
import { createExtra } from '@/services/extra/createExtra'
import type { CreateExtraDTO } from '@/types/Extra'
import type { Status } from '@/types/Status'

export default function PageCreateExtra() {
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [status, setStatus] = useState<Status>('Ativo')

    const toast = useToast()

    function saveExtra(
        e: FormEvent<HTMLFormElement>,
        formData: CreateExtraDTO,
    ) {
        e.preventDefault()

        if (isSaving) {
            return
        }

        setIsSaving(true)

        const payload = {
            ...formData,
            // status: status,
        } as CreateExtraDTO

        const response = new Promise((resolve, reject) => {
            resolve(createExtra(payload))
        }).finally(() => {
            setIsSaving(false)
        })

        toast.promise(response, toastGenericPatchMessages)
    }

    return (
        <div className="CreateExtra">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/meu-negocio/extras">
                        Extras
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

                <PageHeader.Title>Criar Extra</PageHeader.Title>
            </PageHeader.Root>

            <ExtraForm onSubmit={saveExtra} isSaving={isSaving} />
        </div>
    )
}
