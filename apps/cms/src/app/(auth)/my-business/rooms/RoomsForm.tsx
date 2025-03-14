'use client'

import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'

import InputBox from '@/components/atoms/InputBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'

import { Gallery } from '@/components/organisms/Gallery'
import { RoomsFormData } from './utils/config'

export const RoomsForm: React.FC = () => {
    const { getFieldProps, touched, errors } = useFormikContext<RoomsFormData>()

    return (
        <Form>
            <Stack gap={8}>
                <Flex direction="column" gap={2}>
                    <InputBox
                        label="Nome da Acomodação"
                        error={errors.name}
                        formControl={{
                            isInvalid: !!errors.name && touched.name,
                        }}
                        {...getFieldProps('name')}
                    />
                    <TextAreaBox
                        label="Descrição"
                        maxLength={250}
                        error={errors.description}
                        formControl={{
                            isInvalid:
                                !!errors.description && touched.description,
                        }}
                        {...getFieldProps('description')}
                    />

                    <InputNumberBox label="Unidades disponíveis" />
                </Flex>

                <section>
                    <Text as="h4">Hóspedes</Text>

                    <Stack gap={2}>
                        <InputNumberBox
                            label="Máximo de Hóspedes"
                            error={errors.maxGuests}
                            formControl={{
                                isInvalid:
                                    !!errors.maxGuests && touched.maxGuests,
                            }}
                            {...getFieldProps('maxGuests')}
                        />
                        <InputNumberBox
                            label="Mínimo de Hóspedes"
                            error={errors.minGuests}
                            formControl={{
                                isInvalid:
                                    !!errors.minGuests && touched.minGuests,
                            }}
                            {...getFieldProps('minGuests')}
                        />

                        <InputNumberBox
                            label="Máximo de Adultos"
                            error={errors.maxAdults}
                            formControl={{
                                isInvalid:
                                    !!errors.maxAdults && touched.maxAdults,
                            }}
                            {...getFieldProps('maxAdults')}
                        />
                        <InputNumberBox
                            label="Máximo de Crianças"
                            error={errors.maxChildren}
                            formControl={{
                                isInvalid:
                                    !!errors.maxChildren && touched.maxChildren,
                            }}
                            {...getFieldProps('maxChildren')}
                        />
                    </Stack>
                </section>

                <section>
                    <h4>Preço Base por Diária</h4>

                    <Stack gap={2}>
                        <InputBox
                            label="Preço durante a semana"
                            type="currency"
                            error={errors.weekdaysPrice}
                            formControl={{
                                isInvalid:
                                    !!errors.weekdaysPrice &&
                                    touched.weekdaysPrice,
                            }}
                            {...getFieldProps('weekdaysPrice')}
                        />
                        <InputBox
                            label="Preço fim de semana"
                            type="currency"
                            error={errors.weekendPrice}
                            formControl={{
                                isInvalid:
                                    !!errors.weekendPrice &&
                                    touched.weekendPrice,
                            }}
                            {...getFieldProps('weekendPrice')}
                        />
                        <InputBox
                            label="Valor por adulto extra"
                            type="currency"
                            error={errors.extraAdultPrice}
                            formControl={{
                                isInvalid:
                                    !!errors.extraAdultPrice &&
                                    touched.extraAdultPrice,
                            }}
                            {...getFieldProps('extraAdultPrice')}
                        />
                        <InputNumberBox
                            label="Cobrar valor extra por adulto acima de"
                            error={errors.chargeExtraAdultHigherThan}
                            formControl={{
                                isInvalid:
                                    !!errors.chargeExtraAdultHigherThan &&
                                    touched.chargeExtraAdultHigherThan,
                            }}
                            {...getFieldProps('chargeExtraAdultHigherThan')}
                        />
                    </Stack>
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
                </section>
                {/*
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
                </section> */}

                <Button type="submit" size="lg">
                    Salvar
                </Button>
            </Stack>
        </Form>
    )
}
