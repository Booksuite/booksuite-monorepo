import { InternalMenu } from '@/components/shared/InternalMenu'
import { PageHeader } from '@/components/shared/PageHeader'
import BoxIcon from '@/components/svgs/icons/BoxIcon'
import HomeIcon from '@/components/svgs/icons/HomeIcon'
import MoneyIcon from '@/components/svgs/icons/MoneyIcon'

import { Icons } from '@/components/svgs/icons'

export default function Configuracoes() {
    const fatherPath = '/configuracoes'

    return (
        <div className="Configuracoes">
            <PageHeader.Root>
                <PageHeader.BackLink href="/">Início</PageHeader.BackLink>

                <PageHeader.Title>Configurações</PageHeader.Title>
            </PageHeader.Root>

            <InternalMenu.Root>
                <InternalMenu.Button href={`${fatherPath}/dados-gerais`}>
                    <HomeIcon />
                    Dados gerais
                </InternalMenu.Button>

                <InternalMenu.Button
                    href={`${fatherPath}/descricao-do-negocio`}
                >
                    <Icons.Hotel />
                    Descrição do Negócio
                </InternalMenu.Button>

                <InternalMenu.Button href={`${fatherPath}/endereco`}>
                    <Icons.Marker />
                    Endereço
                </InternalMenu.Button>

                <InternalMenu.Button href={`${fatherPath}/identidade-visual`}>
                    <Icons.Pencil />
                    Identidade Visual
                </InternalMenu.Button>

                <InternalMenu.Button href={`${fatherPath}/comodidades`}>
                    <Icons.Pool />
                    Comodidades
                </InternalMenu.Button>

                <InternalMenu.Button
                    href={`${fatherPath}/contato-e-redes-sociais`}
                >
                    <Icons.At />
                    Contato e Redes Sociais
                </InternalMenu.Button>

                <InternalMenu.Button href={`${fatherPath}/informacoes-fiscais`}>
                    <BoxIcon />
                    Informações Fiscais
                </InternalMenu.Button>

                <InternalMenu.Button
                    href={`${fatherPath}/regras-de-hospedagem`}
                >
                    <Icons.Offer />
                    Regras de Hospedagem
                </InternalMenu.Button>

                <InternalMenu.Button href={`${fatherPath}/formas-de-pagamento`}>
                    <MoneyIcon />
                    Formas de Pagamento
                </InternalMenu.Button>

                <InternalMenu.Button
                    href={`${fatherPath}/politicas-de-reservas`}
                >
                    <Icons.Document />
                    Políticas de Reservas
                </InternalMenu.Button>

                <InternalMenu.Button
                    href={`${fatherPath}/politicas-de-cancelamento`}
                >
                    <Icons.File />
                    Políticas de Cancelamento
                </InternalMenu.Button>

                <InternalMenu.Button href={`${fatherPath}/politica-de-idade`}>
                    <Icons.Children />
                    Política de Idade
                </InternalMenu.Button>

                <InternalMenu.Button
                    href={`${fatherPath}/politica-de-privacidade`}
                >
                    <Icons.List />
                    Política de Privacidade
                </InternalMenu.Button>
            </InternalMenu.Root>
        </div>
    )
}
