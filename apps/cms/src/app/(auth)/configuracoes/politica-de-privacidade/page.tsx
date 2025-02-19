'use client'

import { Button, Flex, Stack } from '@chakra-ui/react'

import { TextAreaBox } from '@/components/atoms/Input/TextAreaBox'
import { PageHeader } from '@/components/organisms/PageHeader'

export default function PoliticaDePrivacidade() {
    function handleSubmit() {
        console.log('oi')
    }

    return (
        <div className="PoliticaDePrivacidade">
            <PageHeader.Root>
                <PageHeader.BackLink href="/configuracoes">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Política de Privacidade</PageHeader.Title>
            </PageHeader.Root>

            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Flex direction="column" gap={2}>
                        <TextAreaBox label="Descrição da Política" />
                    </Flex>

                    <Button type="submit">Salvar</Button>
                </Stack>
            </form>
        </div>
    )
}
