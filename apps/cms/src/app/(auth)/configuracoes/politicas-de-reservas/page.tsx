'use client'

import { Button, Flex, Stack, useToast } from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { useCompanyContext } from '@/app/providers/companyProvider'
import type { UpdateCompanyDTO } from '@/common/types/Company'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'
import { updateCompany } from '@/common/services/company/updateCompany'

export default function PoliticasDeReservas() {
    const [formData, setFormData] = useState<UpdateCompanyDTO>(null)
    const [isSaving, setIsSaving] = useState<boolean>(false)

    const { company, setCompany } = useCompanyContext()

    const toast = useToast()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (isSaving || !formData) {
            return
        }

        setIsSaving(true)

        const response = new Promise((resolve, reject) => {
            resolve(updateCompany(company.id, formData))
        })
            .then((resp: any) => {
                if (resp.success) {
                    if (resp.company) {
                        setCompany(resp.company)
                    }
                }
            })
            .finally(() => {
                setIsSaving(false)
            })

        toast.promise(response, toastGenericPatchMessages)
    }

    if (!company) {
        return
    }

    return (
        <div className="PoliticasDeReservas">
            <PageHeader.Root>
                <PageHeader.BackLink href="/configuracoes">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Políticas de Reservas</PageHeader.Title>
            </PageHeader.Root>

            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Flex direction="column" gap={2}>
                        <TextAreaBox
                            label="Descrição da Política"
                            defaultValue={company.policy}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    policy: e.target.value,
                                })
                            }}
                        />
                    </Flex>

                    <Button type="submit" isLoading={isSaving}>
                        Salvar
                    </Button>
                </Stack>
            </form>
        </div>
    )
}
