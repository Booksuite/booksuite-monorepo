'use client'

import { useState, type FormEvent } from 'react'

import { ExtraForm } from '@/components/extras/ExtraForm'
import { SwitchBox } from '@/components/shared/form/SwitchBox'
import { PageHeader } from '@/components/shared/PageHeader'
import { toastGenericPatchMessages } from '@/contexts/constants/toastMessages'
import { useGetExtra } from '@/hooks/extras/useGetExtra'
import { updateExtra } from '@/services/extra/updateExtra'
import { UpdateExtraDTO } from '@/types/Extra'
import { Flex, Spinner, useToast } from '@chakra-ui/react'

export default function DetalhesExtras({ params }: { params: { id: string } }) {
    const { isLoading, extra, error } = useGetExtra(params.id)

    const [isSaving, setIsSaving] = useState<boolean>(false)
    // const [status, setStatus] = useState<Status>(extra?.status ?? "Inativo");

    const toast = useToast()

    function saveExtra(
        e: FormEvent<HTMLFormElement>,
        formData: UpdateExtraDTO,
    ) {
        e.preventDefault()

        if (isSaving) {
            return
        }

        setIsSaving(true)

        const payload = {
            ...formData,
            // status: status,
        } as UpdateExtraDTO

        const response = new Promise((resolve, reject) => {
            resolve(updateExtra(params.id, payload))
        }).finally(() => {
            setIsSaving(false)
        })

        toast.promise(response, toastGenericPatchMessages)
    }

    // TODO: ADD STATUS
    // useEffect(() => {
    //   if (extra) {
    //     setStatus(extra.status);
    //   }
    // }, [extra]);

    return (
        <div className="DetalhesExtras">
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
                    />
                </Flex>

                <PageHeader.Title>Detalhes do Extra</PageHeader.Title>
            </PageHeader.Root>

            {isLoading ? (
                <Spinner />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ExtraForm
                    onSubmit={saveExtra}
                    data={extra}
                    isSaving={isSaving}
                />
            )}
        </div>
    )
}
