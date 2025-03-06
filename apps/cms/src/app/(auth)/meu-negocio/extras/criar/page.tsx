'use client'

import { Flex, useToast } from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { createExtra } from '@/common/services/extra/createExtra'
import type { CreateExtraDTO } from '@/common/types/Extra'
import type { Status } from '@/common/types/Status'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'
import { DashboardExtraForm } from '@/components/templates/DashboardExtraForm'

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

            <DashboardExtraForm onSubmit={saveExtra} isSaving={isSaving} />
        </div>
    )
}
