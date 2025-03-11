'use client'

import { Flex, Spinner, useToast } from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { $api } from '@/common/providers/client'
import { updateExtra } from '@/common/services/extra/updateExtra'
import { UpdateExtraDTO } from '@/common/types/Extra'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'
import { DashboardExtraForm } from '@/components/templates/DashboardExtraForm'

export default function ExtraDetailPage({
    params,
}: {
    params: { id: string }
}) {
    const companyId = useCurrentCompanyId()
    const {
        data: extra,
        isLoading,
        error,
    } = $api.useQuery('get', '/company/{companyId}/service/{id}', {
        params: { path: { companyId, id: params.id } },
    })

    const [isSaving, setIsSaving] = useState<boolean>(false)

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

    return (
        <div>
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/my-business/extras">
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
                <DashboardExtraForm
                    onSubmit={saveExtra}
                    data={extra}
                    isSaving={isSaving}
                />
            )}
        </div>
    )
}
