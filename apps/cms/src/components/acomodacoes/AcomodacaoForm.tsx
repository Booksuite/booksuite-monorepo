'use client'

import { Gallery } from '@/src/components/shared/Gallery'
import InputBox from '@/src/components/shared/form/InputBox'
import InputCheckboxBox from '@/src/components/shared/form/InputCheckboxBox'
import InputNumberBox from '@/src/components/shared/form/InputNumberBox'
import { TextAreaBox } from '@/src/components/shared/form/TextAreaBox'
import { Icons } from '@/src/components/svgs/icons'
import {
    Button,
    CheckboxGroup,
    Flex,
    SimpleGrid,
    Stack,
} from '@chakra-ui/react'
import { useState, type FormEvent } from 'react'

import { PriceList } from '@/src/components/shared/form/PriceList'
import {
    Acomodacao,
    CreateAcomodacaoDTO,
    UpdateAcomodacaoDTO,
} from '@/types/Acomodacao'

interface AcomodacaoFormProps<
    T extends UpdateAcomodacaoDTO | CreateAcomodacaoDTO,
> {
    action?: (data: FormData) => Promise<void>
    data?: Acomodacao
    isSaving?: boolean
    onSubmit?: (e: FormEvent<HTMLFormElement>, data: T) => void
}

export function AcomodacaoForm<
    T extends UpdateAcomodacaoDTO | CreateAcomodacaoDTO,
>({ data, isSaving, onSubmit, ...props }: AcomodacaoFormProps<T>) {
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
                        label="Nome da Acomodação"
                        defaultValue={data?.name ?? ''}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                name: event.target.value,
                            })
                        }}
                    />

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

                    <InputNumberBox
                        label="Quantidade disponível"
                        defaultValue={data?.avaiableGuests ?? 0}
                        onChange={(
                            valueAsString: string,
                            valueAsNumber: number,
                        ) => {
                            setFormData({
                                ...formData,
                                avaiableGuests: valueAsNumber,
                            })
                        }}
                    />
                </Flex>

                <section>
                    <h4>Hóspedes</h4>

                    <SimpleGrid spacing={2}>
                        <InputNumberBox
                            label="Máximo de Hóspedes"
                            defaultValue={data?.maxGuests ?? 0}
                            onChange={(
                                valueAsString: string,
                                valueAsNumber: number,
                            ) => {
                                setFormData({
                                    ...formData,
                                    maxGuests: valueAsNumber,
                                })
                            }}
                        />
                        <InputNumberBox
                            label="Mínimo de Hóspedes"
                            defaultValue={data?.minGuests ?? 0}
                            onChange={(
                                valueAsString: string,
                                valueAsNumber: number,
                            ) => {
                                setFormData({
                                    ...formData,
                                    minGuests: valueAsNumber,
                                })
                            }}
                        />
                        <InputNumberBox
                            label="Máximo de Adultos"
                            defaultValue={data?.maxAdults ?? 0}
                            onChange={(
                                valueAsString: string,
                                valueAsNumber: number,
                            ) => {
                                setFormData({
                                    ...formData,
                                    maxAdults: valueAsNumber,
                                })
                            }}
                        />
                        <InputNumberBox
                            label="Máximo de Crianças"
                            defaultValue={data?.maxChildren ?? 0}
                            onChange={(
                                valueAsString: string,
                                valueAsNumber: number,
                            ) => {
                                setFormData({
                                    ...formData,
                                    maxChildren: valueAsNumber,
                                })
                            }}
                        />
                    </SimpleGrid>
                </section>

                <section>
                    <h4>Preço Base por Diária</h4>

                    <SimpleGrid spacing={2}>
                        <InputBox
                            label="Preço durante a semana"
                            type="currency"
                            defaultValue={data?.weekdaysPrice ?? ''}
                            onValueChange={(value, name, values) => {
                                setFormData({
                                    ...formData,
                                    weekdaysPrice: values.float,
                                })
                            }}
                        />

                        <InputBox
                            label="Preço fim de semana"
                            type="currency"
                            defaultValue={data?.weekendPrice ?? ''}
                            onValueChange={(value, name, values) => {
                                setFormData({
                                    ...formData,
                                    weekendPrice: values.float,
                                })
                            }}
                        />

                        <InputBox
                            label="Valor por adulto extra"
                            type="currency"
                            defaultValue={data?.extraAdultPrice ?? ''}
                            onValueChange={(value, name, values) => {
                                setFormData({
                                    ...formData,
                                    extraAdultPrice: values.float,
                                })
                            }}
                        />

                        <InputNumberBox
                            label="Cobrar valor extra por adulto acima de"
                            defaultValue={data?.extraAdultPriceQtd ?? 0}
                            onChange={(
                                valueAsString: string,
                                valueAsNumber: number,
                            ) => {
                                setFormData({
                                    ...formData,
                                    extraAdultPriceQtd: valueAsNumber,
                                })
                            }}
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
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                videoUrl: event.target.value,
                            })
                        }}
                    />
                </section>

                <section>
                    <h2>Comodidades</h2>

                    <h4>Top 5 destaques</h4>

                    <CheckboxGroup>
                        <Stack spacing={[2]} direction={['column']}>
                            <InputCheckboxBox defaultChecked>
                                Banheira de hidromassagem
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Piscina aquecida
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Cozinha completa
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Área gourmet
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Vista para a lagoa
                            </InputCheckboxBox>
                        </Stack>
                    </CheckboxGroup>

                    <Button
                        className="mt-4 w-full"
                        variant="outline"
                        leftIcon={<Icons.Plus />}
                    >
                        Selecionar
                    </Button>

                    <h4 className="mt-4">Demais Comodidades</h4>

                    <CheckboxGroup>
                        <Stack spacing={[2]} direction={['column']}>
                            <InputCheckboxBox defaultChecked>
                                Ar condicionado
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Balanço suspenso
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Cafeteira dolce gusto
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Churrasqueira
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Cofre
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Ducha dupla
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Fogo de chão
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Garagem privativa
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Internet Wi-Fi
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Toalhas
                            </InputCheckboxBox>
                        </Stack>
                    </CheckboxGroup>

                    <Button
                        className="mt-4 w-full"
                        variant="outline"
                        leftIcon={<Icons.Plus />}
                    >
                        Selecionar
                    </Button>

                    <h4 className="mt-4">Tipo de cama</h4>

                    <PriceList.Root
                        notFoundText="Nenhum Tipo de Cama Adicionado"
                        showAddButton={false}
                    >
                        <PriceList.Item
                            title="Cama de casal"
                            name={`extra[0]`}
                            defaultValue={1}
                        />
                        <PriceList.Item
                            title="Cama de casal queen"
                            name={`extra[1]`}
                        />
                        <PriceList.Item
                            title="Cama de casal king"
                            name={`extra[2]`}
                        />
                        <PriceList.Item
                            title="Cama retrátil"
                            name={`extra[3]`}
                        />
                        <PriceList.Item
                            title="Sofá-cama"
                            name={`extra[4]`}
                            defaultValue={1}
                        />
                        <PriceList.Item title="Bicama" name={`extra[5]`} />
                        <PriceList.Item
                            title="Cama de solteiro"
                            name={`extra[5]`}
                        />
                        <PriceList.Item
                            title="Beliche duplo"
                            name={`extra[5]`}
                        />
                        <PriceList.Item
                            title="Colchão extra"
                            name={`extra[5]`}
                        />
                        <PriceList.Item
                            title="Colchão de água"
                            name={`extra[5]`}
                        />
                        <PriceList.Item
                            title="Cama tipo futon"
                            name={`extra[5]`}
                        />
                        <PriceList.Item title="Berço" name={`extra[5]`} />
                    </PriceList.Root>
                </section>

                <Button type="submit">Salvar</Button>
            </Stack>
        </form>
    )
}
