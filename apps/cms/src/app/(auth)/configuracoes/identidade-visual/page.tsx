'use client'

import {
    AspectRatio,
    Box,
    Button,
    Flex,
    Image,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { useCompanyContext } from '@/app/providers/companyProvider'
import InputBox from '@/components/atoms/Input/InputBox'
import SelectBox from '@/components/atoms/SelectBox'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'
import { toastGenericPatchMessages } from '@/contexts/constants/toastMessages'
import { updateCompany } from '@/services/company/updateCompany'
import type { UpdateCompanyDTO } from '@/types/Company'

export default function IdentidadeVisual() {
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
        <div className="IdentidadeVisual">
            <PageHeader.Root>
                <PageHeader.BackLink href="/configuracoes">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Identidade Visual</PageHeader.Title>
            </PageHeader.Root>

            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Flex direction="column" gap={2}>
                        <h2 className="mb-0">Upload logotipo</h2>

                        <SelectBox
                            name="priceAdjustment"
                            options={[
                                {
                                    value: 'Quadrada',
                                    label: 'Quadrada',
                                },
                                { value: 'Nome Lorem', label: 'Nome Lorem' },
                                { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                            ]}
                            defaultValue={{
                                value: 'Quadrada',
                                label: 'Quadrada',
                            }}
                            label="Fuso Horário"
                        />

                        <div className="rounded bg-[var(--clr-tertiary-50)] p-4 flex items-center justify-center">
                            <Image src={'/chale-logo.png'} alt="" />
                        </div>

                        <Button
                            className="mt-4 w-full"
                            variant={'outline'}
                            leftIcon={<Icons.Plus className="!w-auto" />}
                        >
                            Substituir logotipo
                        </Button>

                        <h2 className="mt-6 mb-0">Upload Favicon</h2>

                        <div className="rounded bg-[var(--clr-tertiary-50)] p-4 flex items-center justify-center">
                            <Image width={45} src={'/chale-logo.png'} alt="" />
                        </div>

                        <Button
                            className="mt-4 w-full"
                            variant={'outline'}
                            leftIcon={<Icons.Plus className="!w-auto" />}
                        >
                            Substituir favicon
                        </Button>

                        <h2 className="mt-6 mb-0">Cor principal do site</h2>

                        <Flex direction={'row'} gap={2}>
                            <InputBox
                                label="Cor principal (HEX)"
                                defaultValue={company.theme}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        theme: event.target.value,
                                    })
                                }}
                            />

                            <AspectRatio
                                className="flex-none w-[56px]"
                                ratio={1}
                            >
                                <Box
                                    className="rounded"
                                    width={100}
                                    bgColor={formData?.theme ?? company.theme}
                                ></Box>
                            </AspectRatio>
                        </Flex>
                    </Flex>

                    <Button type="submit" isLoading={isSaving}>
                        Salvar
                    </Button>
                </Stack>
            </form>
        </div>
    )
}
