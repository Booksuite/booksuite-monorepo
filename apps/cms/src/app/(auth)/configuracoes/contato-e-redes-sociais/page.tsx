'use client'

import { PageHeader } from '@/src/components/shared/PageHeader'
import InputBox from '@/src/components/shared/form/InputBox'
import { Icons } from '@/src/components/svgs/icons'
import { Button, Flex, Stack } from '@chakra-ui/react'

export default function ContatoERedesSociais() {
    function handleSubmit() {
        console.log('oi')
    }

    return (
        <div className="ContatoERedesSociais">
            <PageHeader.Root>
                <PageHeader.BackLink href="/configuracoes">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Contato e Redes Sociais</PageHeader.Title>
            </PageHeader.Root>

            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Flex direction="column" gap={2}>
                        <InputBox
                            type="email"
                            label="E-mail de Reserva"
                            defaultValue={'nome@email.com'}
                        />

                        <Button
                            className="w-[fit-content]"
                            variant={'outline'}
                            type="button"
                            leftIcon={<Icons.Plus />}
                        >
                            Adicionar e-mail
                        </Button>

                        <h2 className="mt-4 mb-0">Telefones (opcional) </h2>
                        <InputBox label="WhatsApp de Vendas" />
                        <InputBox label="WhatsApp para Hóspedes" />
                        <InputBox label="Telefone Principal" />
                        <InputBox label="Telefone Celular" />

                        <Button
                            className="w-[fit-content]"
                            variant={'outline'}
                            type="button"
                            leftIcon={<Icons.Plus />}
                        >
                            Adicionar telefone
                        </Button>

                        <h2 className="mt-4 mb-0">Redes sociais (opcional) </h2>
                        <InputBox label="URL do Instagram" />
                        <InputBox label="URL do Facebook" />
                        <InputBox label="URL do Youtube" />
                        <InputBox label="URL do TikTok" />
                        <InputBox label="URL do TripAdvisor" />

                        <Button
                            className="w-[fit-content]"
                            variant={'outline'}
                            type="button"
                            leftIcon={<Icons.Plus />}
                        >
                            Adicionar rede social
                        </Button>
                    </Flex>

                    <Button type="submit">Salvar</Button>
                </Stack>
            </form>
        </div>
    )
}
