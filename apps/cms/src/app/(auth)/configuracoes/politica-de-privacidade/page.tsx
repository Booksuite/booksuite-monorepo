'use client'

import { PageHeader } from '@/components/shared/PageHeader'
import { TextAreaBox } from '@/components/shared/form/TextAreaBox'
import { Button, Flex, Stack } from '@chakra-ui/react'

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
