'use client'

import { Button, Flex, Stack } from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import { CreateExtraDTO, UpdateExtraDTO } from '@/common/types/Extra'
import InputBox from '@/components/atoms/InputBox'
import { NumberInput } from '@/components/atoms/NumberInput'
import SelectBox from '@/components/atoms/SelectBox'

import { ExtraFormProps } from './types'

export const DashboardExtraForm: React.FC<
    ExtraFormProps<UpdateExtraDTO | CreateExtraDTO>
> = ({ data, onSubmit, ...props }) => {
    const [formData, setFormData] = useState<UpdateExtraDTO | CreateExtraDTO>(
        data ?? {},
    )

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (onSubmit) {
            onSubmit(e, formData)
        }
    }

    return (
        <form {...props} onSubmit={handleSubmit}>
            <Stack gap={8}>
                <Flex direction="column" gap={2}>
                    <InputBox
                        label="Nome do Extra"
                        defaultValue={data?.name ?? ''}
                        onChange={(event) => {
                            setFormData((prev) => ({
                                ...prev,
                                name: event.target.value,
                            }))
                        }}
                    />

                    <SelectBox
                        options={[
                            { value: 'Por unidade', label: 'Por unidade' },
                            { value: 'Nome Lorem', label: 'Nome Lorem' },
                            { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                        ]}
                        defaultValue={
                            data?.billType
                                ? [
                                      {
                                          value: data.billType,
                                          label: data.billType,
                                      },
                                  ]
                                : ''
                        }
                        label="Tipo de Cobrança"
                        onChange={(e: { value: any }) => {
                            setFormData((prev) => ({
                                ...prev,
                                billType: e.value,
                            }))
                        }}
                    />

                    <InputBox
                        label="Preço"
                        type="currency"
                        defaultValue={data?.price ?? ''}
                        onValueChange={(value, name, values) => {
                            setFormData((prev) => ({
                                ...prev,
                                price: values.float,
                            }))
                        }}
                    />

                    <NumberInput
                        label="Mínimo de Diárias"
                        defaultValue={data?.minDaily ?? 0}
                        onChange={(_, valueAsNumber) => {
                            setFormData((prev) => ({
                                ...prev,
                                minDaily: valueAsNumber,
                            }))
                        }}
                    />

                    <NumberInput
                        label="Antecedência mínima"
                        defaultValue={data?.minNotice ?? 0}
                        onChange={(_, valueAsNumber) => {
                            setFormData((prev) => ({
                                ...prev,
                                minNotice: valueAsNumber,
                            }))
                        }}
                    />
                </Flex>

                <Button type="submit">Salvar</Button>
            </Stack>
        </form>
    )
}
