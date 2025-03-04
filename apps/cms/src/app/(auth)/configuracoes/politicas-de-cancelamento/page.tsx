'use client'

import { Button, Flex, Stack, useToast } from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { useCompanyContext } from '@/app/providers/companyProvider'
import type { UpdateCompanyDTO } from '@/common/types/Company'
import InputBox from '@/components/atoms/InputBox'
import InputNumberBox from '@/components/atoms/InputNumberBox'
import SelectBox from '@/components/atoms/SelectBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { PageHeader } from '@/components/organisms/PageHeader'
import { updateCompany } from '@/common/services/company/updateCompany'

export default function PoliticasDeCancelamento() {
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
        <div className="PoliticasDeCancelamento">
            <PageHeader.Root>
                <PageHeader.BackLink href="/configuracoes">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Políticas de Cancelamento</PageHeader.Title>
            </PageHeader.Root>

            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Flex direction="column" gap={2}>
                        <h2>
                            Reembolso para cancelamento definitivo ou troca de
                            datas
                        </h2>

                        <Flex direction="column" gap={2}>
                            <h3 className="mb-0">Faixa de reembolso 01</h3>

                            {/* <InputNumberBox
                name="minNotice"
                label="Dias antes do check-in"
                defaultValue={company?.cancelPolicy?.bands[0]?.daysBeforeCheckin ?? 0}
                onChange={(valueAsString: string, valueAsNumber: number) => {
                  setFormData(
                    produce(formData, (draft) => {
                      if (draft.cancelPolicy?.bands?.[0]) {
                        draft.cancelPolicy.bands[0].daysBeforeCheckin = valueAsNumber;
                      }
                    })
                  );
                }}
              /> */}

                            <SelectBox
                                name="priceAdjustment"
                                options={[
                                    {
                                        value: 'Percentual da Reserva',
                                        label: 'Percentual da Reserva',
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
                                defaultValue={{
                                    value: 'Percentual da Reserva',
                                    label: 'Percentual da Reserva',
                                }}
                                label="Períodos de hospedagem"
                            />

                            <InputBox label="Valor em %" defaultValue={20} />
                        </Flex>

                        <Flex direction="column" gap={2} className="mt-4">
                            <h3 className="mb-0">Faixa de reembolso 02</h3>

                            <InputNumberBox
                                name="minNotice"
                                defaultValue={14}
                                label="Cancelamento entre (dias)"
                                isDisabled
                            />
                            <InputNumberBox
                                name="minNotice"
                                defaultValue={5}
                                label="Até (dias)"
                            />

                            <SelectBox
                                name="priceAdjustment"
                                options={[
                                    {
                                        value: 'Percentual da Reserva',
                                        label: 'Percentual da Reserva',
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
                                defaultValue={{
                                    value: 'Percentual da Reserva',
                                    label: 'Percentual da Reserva',
                                }}
                                label="Períodos de hospedagem"
                            />

                            <InputBox label="Valor em %" defaultValue={50} />
                        </Flex>

                        <Flex direction="column" gap={2} className="mt-4">
                            <h3 className="mb-0">Faixa de reembolso 03</h3>

                            <InputNumberBox
                                name="minNotice"
                                defaultValue={4}
                                label="Cancelamento entre (dias)"
                                isDisabled
                            />
                            <InputNumberBox
                                name="minNotice"
                                defaultValue={0}
                                label="Até (dias)"
                            />

                            <SelectBox
                                name="priceAdjustment"
                                options={[
                                    {
                                        value: 'Percentual da Reserva',
                                        label: 'Percentual da Reserva',
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
                                defaultValue={{
                                    value: 'Percentual da Reserva',
                                    label: 'Percentual da Reserva',
                                }}
                                label="Períodos de hospedagem"
                            />

                            <InputBox label="Valor em %" defaultValue={100} />
                        </Flex>

                        <TextAreaBox
                            label="Outras regras e observações"
                            defaultValue={company.cancelPolicy}
                            onChange={(e) => {
                                console.log(e)
                                setFormData({
                                    ...formData,
                                    cancelPolicy: e.target.value,
                                })
                            }}
                        />
                    </Flex>

                    <Button type="submit">Salvar</Button>
                </Stack>
            </form>
        </div>
    )
}
