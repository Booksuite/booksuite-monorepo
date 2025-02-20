'use client'

import {
    Alert,
    AlertDescription,
    Button,
    Flex,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { useCompanyContext } from '@/app/providers/companyProvider'
import InputBox from '@/components/atoms/InputBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { Gallery } from '@/components/organisms/Gallery'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'
import { toastGenericPatchMessages } from '@/contexts/constants/toastMessages'
import { updateCompany } from '@/services/company/updateCompany'
import type { UpdateCompanyDTO } from '@/types/Company'

export default function DescricaoDoNegocio() {
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
        <div className="DescricaoDoNegocio">
            <PageHeader.Root>
                <PageHeader.BackLink href="/configuracoes">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Descrição do Negócio</PageHeader.Title>
            </PageHeader.Root>

            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Flex direction="column" gap={2}>
                        <InputBox
                            label="Nome da Propriedade"
                            isDisabled
                            defaultValue={company.name}
                        />

                        <TextAreaBox
                            label="Descrição curta"
                            maxLength={165}
                            defaultValue={company.shortDescription}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    shortDescription: e.target.value,
                                })
                            }}
                        />

                        <TextAreaBox
                            label="Descrição longa - Sobre nós"
                            maxLength={1000}
                            defaultValue={company.description}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }}
                        />
                    </Flex>

                    <section>
                        <h2>Fotos e vídeo</h2>

                        <h4>Galeria de fotos</h4>

                        <Gallery.Root
                            items={[
                                '/imagem-exemplo.png',
                                '/imagem-exemplo.png',
                                '/imagem-exemplo.png',
                                '/imagem-exemplo.png',
                                '/imagem-exemplo.png',
                                '/imagem-exemplo.png',
                                '/imagem-exemplo.png',
                                '/imagem-exemplo.png',
                                '/imagem-exemplo.png',
                                '/imagem-exemplo.png',
                                '/imagem-exemplo.png',
                            ]}
                        />

                        <h4 className="mt-4">Vídeo</h4>

                        <InputBox
                            label="URL de Vídeo do Youtube (opcional)"
                            defaultValue={''}
                        />

                        <h4 className="mt-4">Banner de compartilhamento</h4>

                        <Gallery.Item src={'/imagem-exemplo.png'} />

                        <Button
                            className="mt-4 w-full"
                            variant={'outline'}
                            leftIcon={<Icons.Refresh className="!w-auto" />}
                        >
                            Substituir Foto
                        </Button>

                        <Alert
                            className="mt-10"
                            justifyContent={'center'}
                            gap={2}
                        >
                            <Icons.Info className="!w-auto" />
                            <AlertDescription>
                                A imagem será exibida quando você compartilhar o
                                site em alguma rede social ou aplicativo de
                                mensagens.
                            </AlertDescription>
                        </Alert>
                    </section>

                    <Button type="submit" isLoading={isSaving}>
                        Salvar
                    </Button>
                </Stack>
            </form>
        </div>
    )
}
