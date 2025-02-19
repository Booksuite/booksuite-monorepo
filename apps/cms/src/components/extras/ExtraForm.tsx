'use client'

import {
    Button,
    CheckboxGroup,
    Flex,
    SimpleGrid,
    Stack,
} from '@chakra-ui/react'
import { type FormEvent, useState } from 'react'

import DateRangeBox from '@/components/atoms/Input/DateRangeBox'
import InputBox from '@/components/atoms/Input/InputBox'
import InputCheckboxBox from '@/components/atoms/Input/InputCheckboxBox'
import InputNumberBox from '@/components/atoms/Input/InputNumberBox'
import SelectBox from '@/components/atoms/Input/SelectBox'
import { SwitchBox } from '@/components/atoms/Input/SwitchBox'
import { TextAreaBox } from '@/components/atoms/Input/TextAreaBox'
import { Gallery } from '@/components/organisms/Gallery'
import { Icons } from '@/components/svgs/icons'
import { CreateExtraDTO, Extra, UpdateExtraDTO } from '@/types/Extra'

interface ExtraFormProps<T extends UpdateExtraDTO | CreateExtraDTO> {
    action?: (data: FormData) => Promise<void>
    data?: Extra
    isSaving?: boolean
    onSubmit?: (e: FormEvent<HTMLFormElement>, data: T) => void
}

export function ExtraForm<T extends UpdateExtraDTO | CreateExtraDTO>({
    data,
    isSaving,
    onSubmit,
    ...props
}: ExtraFormProps<T>) {
    const [formData, setFormData] = useState<T>(null)

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
                            setFormData({
                                ...formData,
                                name: event.target.value,
                            })
                        }}
                    />

                    <SelectBox
                        options={[
                            {
                                value: 'Por unidade',
                                label: 'Por unidade',
                            },
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
                        onChange={(e: { value: string; label: string }) => {
                            setFormData({ ...formData, billType: e.value })
                        }}
                    />

                    <InputBox
                        label="Preço"
                        type="currency"
                        defaultValue={data?.price ?? ''}
                        onValueChange={(value, name, values) => {
                            setFormData({ ...formData, price: values.float })
                        }}
                    />

                    <InputNumberBox
                        label="Mínimo de Diárias"
                        defaultValue={data?.minDaily ?? 0}
                        onChange={(
                            valueAsString: string,
                            valueAsNumber: number,
                        ) => {
                            setFormData({
                                ...formData,
                                minDaily: valueAsNumber,
                            })
                        }}
                    />
                    <InputNumberBox
                        label="Antecedência mínima"
                        defaultValue={data?.minNotice ?? 0}
                        onChange={(
                            valueAsString: string,
                            valueAsNumber: number,
                        ) => {
                            setFormData({
                                ...formData,
                                minNotice: valueAsNumber,
                            })
                        }}
                    />
                </Flex>

                <section>
                    <h3>Configurações de Venda</h3>
                    <Stack spacing={2}>
                        <SwitchBox
                            label="Vende online no site"
                            id="vende-online"
                            name="vende-online"
                            flexProps={{ justifyContent: 'space-between' }}
                            defaultChecked={data?.onlineSale}
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    onlineSale: event.target.checked,
                                })
                            }}
                        />
                        <SwitchBox
                            label="Vender no painel"
                            id="vende-painel"
                            name="vende-painel"
                            flexProps={{ justifyContent: 'space-between' }}
                            defaultChecked={data?.panelSale}
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    panelSale: event.target.checked,
                                })
                            }}
                        />
                        <SwitchBox
                            label="Vender em períodos específicos"
                            id="vende-periodos"
                            name="vende-periodos"
                            flexProps={{ justifyContent: 'space-between' }}
                            defaultChecked={data?.seasonalSale}
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    seasonalSale: event.target.checked,
                                })
                            }}
                        />
                    </Stack>
                </section>

                <section>
                    <Stack spacing={2}>
                        <h4 className="m-0">Período 1</h4>

                        <DateRangeBox
                            asSingleDate
                            label="Início do Períodos de Compras"
                            singleDateValue={data?.seasonStart ?? null}
                            onChange={(value) => {
                                setFormData({ ...formData, seasonStart: value })
                            }}
                        />
                        <DateRangeBox
                            asSingleDate
                            label="Fim do Período de Compras"
                            singleDateValue={data?.seasonEnd ?? ''}
                            onChange={(value) => {
                                setFormData({ ...formData, seasonEnd: value })
                            }}
                        />
                        <Button variant="outline" leftIcon={<Icons.Plus />}>
                            Adicionar período
                        </Button>
                    </Stack>

                    <SwitchBox
                        my={4}
                        label="Períodos de estaida específicos?"
                        defaultChecked
                        flexProps={{ justifyContent: 'space-between' }}
                    />

                    <Stack spacing={4}>
                        <Stack spacing={2}>
                            <h4>
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    gap={2}
                                >
                                    Período de Estadia 1
                                    <button type="button">
                                        <Icons.Minus color="var(--clr-error)" />
                                    </button>
                                </Flex>
                            </h4>

                            <DateRangeBox
                                asSingleDate
                                label="Início do Período de Estadia"
                                singleDateValue="20/12/2024"
                            />
                            <DateRangeBox
                                asSingleDate
                                label="Fim do Período de Estadia"
                                singleDateValue="02/01/2025"
                            />
                        </Stack>

                        <Stack spacing={2}>
                            <h4>
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    gap={2}
                                >
                                    Período de Estadia 2
                                    <button type="button">
                                        <Icons.Minus color="var(--clr-error)" />
                                    </button>
                                </Flex>
                            </h4>

                            <DateRangeBox
                                asSingleDate
                                label="Início do Período de Estadia"
                                singleDateValue="20/12/2024"
                            />
                            <DateRangeBox
                                asSingleDate
                                label="Fim do Período de Estadia"
                                singleDateValue="02/01/2025"
                            />
                        </Stack>

                        <Button variant="outline" leftIcon={<Icons.Plus />}>
                            Adicionar período
                        </Button>
                    </Stack>
                </section>

                <section>
                    <h2>Categorias válidas</h2>

                    <CheckboxGroup>
                        <Stack spacing={[2]} direction={['column']}>
                            <InputCheckboxBox defaultChecked>
                                Categoria 1
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Categoria 2
                            </InputCheckboxBox>
                            <InputCheckboxBox>Categoria 3</InputCheckboxBox>
                        </Stack>
                    </CheckboxGroup>
                </section>

                <section>
                    <h2>Noites válidas</h2>

                    <CheckboxGroup
                        defaultValue={data?.nights}
                        onChange={(value: string[]) => {
                            setFormData({ ...formData, nights: value })
                        }}
                    >
                        <Stack spacing={[2]} direction={['column']}>
                            <InputCheckboxBox name="noites" value={'Domingo'}>
                                Domingo
                            </InputCheckboxBox>
                            <InputCheckboxBox
                                name="noites"
                                value={'Segunda-feira'}
                            >
                                Segunda-feira
                            </InputCheckboxBox>
                            <InputCheckboxBox
                                name="noites"
                                value={'Terça-feira'}
                            >
                                Terça-feira
                            </InputCheckboxBox>
                            <InputCheckboxBox
                                name="noites"
                                value={'Quarta-feira'}
                            >
                                Quarta-feira
                            </InputCheckboxBox>
                            <InputCheckboxBox
                                name="noites"
                                value={'Quinta-feira'}
                            >
                                Quinta-feira
                            </InputCheckboxBox>
                            <InputCheckboxBox
                                name="noites"
                                value={'Sexta-feira'}
                            >
                                Sexta-feira
                            </InputCheckboxBox>
                            <InputCheckboxBox name="noites" value={'Sábado'}>
                                Sábado
                            </InputCheckboxBox>
                        </Stack>
                    </CheckboxGroup>
                </section>

                <section>
                    <h2>Extras e experiências inclusas</h2>

                    <CheckboxGroup>
                        <Stack spacing={[2]} direction={['column']}>
                            <InputCheckboxBox defaultChecked>
                                Passeio de Veleiro
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Passeio de Balão
                            </InputCheckboxBox>
                            <InputCheckboxBox>
                                Passeio de Stand-up
                            </InputCheckboxBox>
                        </Stack>
                    </CheckboxGroup>

                    <Button
                        className="mt-4 w-full"
                        variant="outline"
                        leftIcon={<Icons.Plus />}
                    >
                        Mostrar Mais
                    </Button>
                </section>

                <section>
                    <h2>Informações</h2>

                    <SimpleGrid spacing={2}>
                        <TextAreaBox
                            label="Descrição"
                            maxLength={250}
                            defaultValue={data?.description ?? ''}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }}
                        />

                        <TextAreaBox
                            label="O que está incluso"
                            defaultValue={data?.included ?? ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    included: e.target.value,
                                })
                            }
                        />

                        <TextAreaBox
                            label="Informações gerais e observações"
                            defaultValue={data?.notes ?? ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    notes: e.target.value,
                                })
                            }
                        />
                    </SimpleGrid>
                </section>

                <section>
                    <h2>Fotos e vídeo</h2>
                    <h4>Galeria</h4>

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
                        defaultValue={data?.videoUrl ?? ''}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                videoUrl: e.target.value,
                            })
                        }
                    />
                </section>

                <Button type="submit">Salvar</Button>
            </Stack>
        </form>
    )
}
