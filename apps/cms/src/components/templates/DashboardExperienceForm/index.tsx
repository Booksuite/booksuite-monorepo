'use client'

import {
    Alert,
    AlertDescription,
    Button,
    CheckboxGroup,
    Flex,
    SimpleGrid,
    Stack,
} from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react'

import {
    CreateExperienceDTO,
    UpdateExperienceDTO,
} from '@/common/types/Experience'
import { DateRangeBox } from '@/components/atoms/DateRangeBox'
import InputBox from '@/components/atoms/InputBox'
import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'
import { NumberInput } from '@/components/atoms/NumberInput'
import SelectBox from '@/components/atoms/Select'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { Gallery } from '@/components/organisms/Gallery'
import { PriceList } from '@/components/organisms/PriceList'
import { Icons } from '@/components/svgs/icons'

import { ExperienceFormProps } from './types'

export const DashboardExperienceForm: React.FC<
    ExperienceFormProps<UpdateExperienceDTO | CreateExperienceDTO>
> = ({ data, isSaving, onSubmit, ...props }) => {
    const [formData, setFormData] = useState<
        UpdateExperienceDTO | CreateExperienceDTO
    >({})

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
                        label="Nome da Experiência"
                        name="name"
                        defaultValue={data?.name}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                [event.target.name]: event.target.value,
                            })
                        }}
                    />

                    <NumberInput
                        name="minDaily"
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
                    <NumberInput
                        name="minNotice"
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
                            id="onlineSale"
                            name="onlineSale"
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
                            id="panelSale"
                            name="panelSale"
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
                            id="seasonalSale"
                            name="seasonalSale"
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
                            singleDateValue={data?.seasonStart ?? undefined}
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    seasonStart: event.target.value,
                                })
                            }}
                        />
                        <DateRangeBox
                            asSingleDate
                            label="Fim do Período de Compras"
                            singleDateValue={data?.seasonEnd ?? ''}
                            onChange={(value) => {
                                setFormData({
                                    ...formData,
                                    seasonEnd: value.target.value,
                                })
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
                                singleDateValue="01/12/2024"
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
                                singleDateValue="01/12/2024"
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
                    <h2>Fotos e vídeo</h2>
                    <h4>Fotos de capa</h4>

                    <Gallery.Item src={'/imagem-exemplo.png'} />

                    <Button
                        className="mt-4 w-full"
                        variant={'outline'}
                        leftIcon={<Icons.Refresh className="!w-auto" />}
                    >
                        Substituir Foto
                    </Button>

                    <Alert className="mt-10" justifyContent={'center'} gap={2}>
                        <Icons.Info className="!w-auto" />
                        <AlertDescription>
                            <b>Atenção:</b> as demais fotos da galeria são
                            exibidas conforme as fotos adicionadas diretamente
                            nos serviços extras inclusos nesta experiência.
                        </AlertDescription>
                    </Alert>

                    <h4 className="mt-4">Vídeo</h4>

                    <InputBox
                        label="URL de Vídeo do Youtube (opcional)"
                        defaultValue={data?.videoUrl}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                videoUrl: e.target.value,
                            })
                        }
                    />
                </section>

                <section>
                    <h2>Descrição e Informação</h2>

                    <SimpleGrid spacing={2}>
                        <TextAreaBox
                            label="Descrição"
                            maxLength={250}
                            defaultValue={data?.description}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }}
                        />

                        <TextAreaBox
                            label="Informações gerais e observações"
                            defaultValue={data?.notes}
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
                    <h2 className="mt-4">Tipo de cama</h2>

                    <PriceList.Root
                        notFoundText="Nenhum Tipo de Cama Adicionado"
                        showAddButton={false}
                    >
                        <PriceList.Item
                            title="Cama de casal"
                            defaultValue={1}
                        />
                        <PriceList.Item title="Cama de casal queen" />
                        <PriceList.Item title="Cama de casal king" />
                        <PriceList.Item title="Cama retrátil" />
                        <PriceList.Item title="Sofá-cama" defaultValue={1} />
                        <PriceList.Item title="Bicama" />
                        <PriceList.Item title="Cama de solteiro" />
                        <PriceList.Item title="Beliche duplo" />
                        <PriceList.Item title="Colchão extra" />
                        <PriceList.Item title="Colchão de água" />
                        <PriceList.Item title="Cama tipo futon" />
                        <PriceList.Item title="Berço" />

                        <Button variant={'outline'} className="w-full">
                            <Icons.Plus className="mr-2 w-5" />
                            Mostrar mais
                        </Button>
                    </PriceList.Root>
                </section>

                <section>
                    <Stack direction={'column'} spacing={2}>
                        <h2 className="mt-4">Preço</h2>

                        <InputBox
                            label="Soma dos Extras Selecionados"
                            type="currency"
                            defaultValue={data?.price}
                            isDisabled
                        />

                        <SelectBox
                            name="priceAdjustment"
                            options={[
                                {
                                    value: 'Desconto percentual',
                                    label: 'Desconto percentual',
                                },
                                { value: 'Nome Lorem', label: 'Nome Lorem' },
                                { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                            ]}
                            defaultValue={
                                data?.priceAdjustment
                                    ? [
                                          {
                                              value: data.priceAdjustment,
                                              label: data.priceAdjustment,
                                          },
                                      ]
                                    : ''
                            }
                            label="Ajuste de Preço"
                            onChange={(e: { value: string; label: string }) => {
                                setFormData({
                                    ...formData,
                                    priceAdjustment: e.value,
                                })
                            }}
                        />

                        <InputBox
                            label="Valor incidente"
                            type="number"
                            defaultValue={data?.discount}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    discount: parseFloat(e.target.value),
                                })
                            }}
                        />

                        <InputBox
                            label="Preço Final da Experiência"
                            type="currency"
                            name="price"
                            defaultValue={data?.price}
                            onValueChange={(value, name, values) => {
                                setFormData({
                                    ...formData,
                                    price: values.float,
                                })
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
                            name="billType"
                            onChange={(e: { value: string; label: string }) => {
                                setFormData({ ...formData, billType: e.value })
                            }}
                        />
                    </Stack>
                </section>

                <Button type="submit" isLoading={isSaving}>
                    Salvar
                </Button>
            </Stack>
        </form>
    )
}
