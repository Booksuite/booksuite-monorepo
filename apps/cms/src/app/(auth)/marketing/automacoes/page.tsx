import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Stack,
} from '@chakra-ui/react'

import SelectBox from '@/components/shared/form/SelectBox'
import { SwitchBox } from '@/components/shared/form/SwitchBox'
import { TextAreaBox } from '@/components/shared/form/TextAreaBox'
import { PageHeader } from '@/components/shared/PageHeader'

export default function AutomacoesPage() {
    return (
        <div>
            <PageHeader.Root>
                <PageHeader.BackLink href="/marketing">
                    Marketing
                </PageHeader.BackLink>

                <PageHeader.Title>Automações</PageHeader.Title>
            </PageHeader.Root>

            <Accordion>
                <AccordionItem border="none">
                    <AccordionButton>
                        <Box as="h2" className="m-0" flex="1" textAlign="left">
                            Novas Reservas
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <Stack direction="column" spacing={4}>
                            <SwitchBox
                                label="Enviar por e-mail"
                                name="email"
                                id="email"
                                defaultChecked
                                flexProps={{ justifyContent: 'space-between' }}
                            />

                            <SwitchBox
                                label="Enviar por WhatsApp"
                                defaultChecked
                                name="WhatsApp"
                                id="WhatsApp"
                                flexProps={{ justifyContent: 'space-between' }}
                            />

                            <TextAreaBox
                                label="Descrição do Pré Check-In"
                                maxLength={1000}
                                defaultValue={
                                    'Olá, {Hóspede}.\n\nMuito obrigado pela sua reserva.\n\nTudo que você precisar referente a reserva e dúvidas em geral, pode chamar diretamente em meu WhatsApp: (48) 9 9999-9999\n\nSe possível, gostaria de pedir pra você responder uma pesquisa rápida, assim podemos continuar melhorando nosso atendimento e sua experiência aqui na pousada. É só clicar no botão abaixo (Responder pesquisa rápida), leva poucos minutos e nos ajudará muito!\n\nSó clicar aqui: Reponder Pesquisa Rápida'
                                }
                            />

                            <SelectBox
                                options={[
                                    {
                                        value: 'Imediatamente após reserva',
                                        label: 'Imediatamente após reserva',
                                    },
                                    {
                                        value: 'Nome Lorem',
                                        label: 'Nome Lorem',
                                    },
                                    {
                                        value: 'Lorem Ipsum',
                                        label: 'Lorem Ipsum',
                                    },
                                ]}
                                defaultValue={[
                                    {
                                        value: 'Imediatamente após reserva',
                                        label: 'Imediatamente após reserva',
                                    },
                                ]}
                                label="Quando será feito o disparo"
                            />
                        </Stack>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                    <AccordionButton>
                        <Box as="h2" className="m-0" flex="1" textAlign="left">
                            Pré Check-In
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                    <AccordionButton>
                        <Box as="h2" className="m-0" flex="1" textAlign="left">
                            Check-In
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                    <AccordionButton>
                        <Box as="h2" className="m-0" flex="1" textAlign="left">
                            Pré Check-Out
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                    <AccordionButton>
                        <Box as="h2" className="m-0" flex="1" textAlign="left">
                            Avaliação pós venda
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                    <AccordionButton>
                        <Box as="h2" className="m-0" flex="1" textAlign="left">
                            Orçamentos
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                    <AccordionButton>
                        <Box as="h2" className="m-0" flex="1" textAlign="left">
                            Reservas Abandonadas
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                    <AccordionButton>
                        <Box as="h2" className="m-0" flex="1" textAlign="left">
                            Reservas Canceladas
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                    <AccordionButton>
                        <Box as="h2" className="m-0" flex="1" textAlign="left">
                            No Show
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            <h2 className="mt-6">Informações enviadas pelo sistema</h2>

            <p className="mb-1">Número da Reserva</p>
            <p className="mb-1">Titular</p>
            <p className="mb-1">Nome da Acomodação</p>
            <p className="mb-1">Data de Entrada</p>
            <p className="mb-1">Data de Saída</p>
            <p className="mb-1">Horário de Check-in</p>
            <p className="mb-1">Horário de Check-out</p>
            <p className="mb-1">Adultos</p>
            <p className="mb-1">Crianças</p>
            <p className="mb-1">Valor Total</p>
            <p className="mb-1">Valor Pago</p>
            <p className="mb-1">Valor em Aberto</p>
            <p className="mb-1">Forma de Pagamento</p>

            <Button className="mt-4 w-full">Salvar</Button>
        </div>
    )
}
