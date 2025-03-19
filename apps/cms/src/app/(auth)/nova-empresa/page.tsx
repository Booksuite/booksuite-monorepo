'use client'

import { Button, CheckboxGroup, Flex, Stack, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useContext, useState } from 'react'

import { CompanyContext } from '@/app/providers/companyProvider'
import { createCompany } from '@/common/services/company/createCompany'
import { CreateCompanyDTO } from '@/common/types/Company'
import { slugify } from '@/common/utils/slugify'
import InputBox from '@/components/atoms/InputBox'
import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'
import SelectBox from '@/components/atoms/SelectBox'
import { toastGenericPostMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'

const initialCompanyData = {
    name: '',
    slug: '',
    responsible: '',
    docType: '',
    identification: '',
    companyName: '',
    address: '',
    number: '',
    country: '',
    state: '',
    city: '',
}

export default function NovaEmpresa() {
    const [formData, setFormData] =
        useState<CreateCompanyDTO>(initialCompanyData)
    const [isSaving, setIsSaving] = useState<boolean>(false)

    const toast = useToast()
    const router = useRouter()

    const { setCompany } = useContext(CompanyContext)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (isSaving) {
            return
        }

        setIsSaving(true)

        const response = new Promise((resolve) => {
            resolve(createCompany(formData))
        })
            .then((resp: any) => {
                if (resp.success) {
                    if (resp.company) {
                        setCompany(resp.company)
                    }

                    router.push('/configuracoes')
                }
            })
            .finally(() => {
                setIsSaving(false)
            })

        toast.promise(response, toastGenericPostMessages)
    }

    return (
        <div className="NovaEmpresa">
            <PageHeader.Root>
                <PageHeader.BackLink href="/">Início</PageHeader.BackLink>

                <PageHeader.Title>Nova Empresa</PageHeader.Title>
            </PageHeader.Root>

            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Flex direction="column" gap={2}>
                        <InputBox
                            label="Nome da Acomodação"
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    name: event.target.value,
                                    slug: slugify(event.target.value),
                                })
                            }}
                        />

                        <SelectBox
                            options={[
                                {
                                    value: 'Pousada',
                                    label: 'Pousada',
                                },
                                { value: 'Nome Lorem', label: 'Nome Lorem' },
                                { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                            ]}
                            label="Tipo de Negócio"
                            onChange={(e: { value: string; label: string }) => {
                                setFormData({
                                    ...formData,
                                    branchBusiness: e.value,
                                })
                            }}
                        />

                        <SelectBox
                            options={[
                                {
                                    value: 'Brasília (GMT - 03:00)',
                                    label: 'Brasília (GMT - 03:00)',
                                },
                                { value: 'Nome Lorem', label: 'Nome Lorem' },
                                { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                            ]}
                            defaultValue={{
                                value: 'Brasília (GMT - 03:00)',
                                label: 'Brasília (GMT - 03:00)',
                            }}
                            label="Fuso Horário"
                            onChange={(e: { value: string; label: string }) => {
                                setFormData({ ...formData, timezone: e.value })
                            }}
                        />

                        <section>
                            <h4 className="mt-4">Idiomas disponíveis</h4>

                            <CheckboxGroup
                            // onChange={(value: string[]) => {
                            //   setFormData({ ...formData, nights: value });
                            // }}
                            >
                                <Stack spacing={[2]} direction={['column']}>
                                    <InputCheckboxBox
                                        name="idioma"
                                        value={'Português'}
                                    >
                                        Português
                                    </InputCheckboxBox>
                                    <InputCheckboxBox
                                        name="idioma"
                                        value={'Inglês'}
                                    >
                                        Inglês
                                    </InputCheckboxBox>
                                </Stack>
                            </CheckboxGroup>
                        </section>
                    </Flex>

                    <Button type="submit" isLoading={isSaving}>
                        Criar
                    </Button>
                </Stack>
            </form>
        </div>
    )
}
