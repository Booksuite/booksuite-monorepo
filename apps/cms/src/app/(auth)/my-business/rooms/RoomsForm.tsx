'use client'

import { Button, Flex, Stack, Text, VStack } from '@chakra-ui/react'
import { FieldArray, Form, useFormikContext } from 'formik'

import InputBox from '@/components/atoms/InputBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'

import { Gallery } from '@/components/organisms/Gallery'
import { RoomsFormData } from './utils/config'

export const RoomsForm: React.FC = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<RoomsFormData>()

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
                </Flex>

                <section>
                    <Stack gap={2}>
                        <FieldArray name="housingUnits">
                            {({ remove, push }) => (
                                <>
                                    <InputNumberBox
                                        label="Unidades disponíveis"
                                        value={values.housingUnits.length}
                                        onChange={({
                                            target: { value: newValue },
                                        }) => {
                                            if (
                                                newValue >
                                                values.housingUnits.length
                                            ) {
                                                push({
                                                    name: (
                                                        values.housingUnits
                                                            .length + 1
                                                    ).toString(),
                                                })
                                            } else if (
                                                newValue <
                                                values.housingUnits.length
                                            ) {
                                                remove(
                                                    values.housingUnits.length -
                                                        1,
                                                )
                                            }
                                        }}
                                    />

                                    <VStack gap={2}>
                                        {values.housingUnits.map((_, index) => {
                                            const error =
                                                errors.housingUnits?.[index]
                                            const errorMessage =
                                                typeof error === 'string'
                                                    ? error
                                                    : error?.name

                                            return (
                                                <InputBox
                                                    key={index}
                                                    label="Nome da unidade"
                                                    error={errors.name}
                                                    formControl={{
                                                        isInvalid:
                                                            !!errorMessage &&
                                                            touched
                                                                .housingUnits?.[
                                                                index
                                                            ]?.name,
                                                    }}
                                                    value={
                                                        values.housingUnits?.[
                                                            index
                                                        ]?.name
                                                    }
                                                    onChange={({
                                                        target: { value },
                                                    }) => {
                                                        setFieldValue(
                                                            `housingUnits.${index}.name`,
                                                            value,
                                                        )
                                                    }}
                                                />
                                            )
                                        })}
                                    </VStack>
                                </>
                            )}
                        </FieldArray>
                    </Stack>
                </section>

                <section>
                    <Text as="h4">Hóspedes</Text>

                    <Stack gap={2}>
                        <InputNumberBox
                            label="Máximo de Hóspedes"
                            error={errors.maxGuests}
                            min={1}
                            formControl={{
                                isInvalid:
                                    !!errors.maxGuests && touched.maxGuests,
                            }}
                            {...getFieldProps('maxGuests')}
                            onChange={handleChange('maxGuests')}
                        />
                        <InputNumberBox
                            label="Mínimo de Hóspedes"
                            min={1}
                            error={errors.minGuests}
                            formControl={{
                                isInvalid:
                                    !!errors.minGuests && touched.minGuests,
                            }}
                            {...getFieldProps('minGuests')}
                            onChange={handleChange('minGuests')}
                        />

                        <InputNumberBox
                            label="Máximo de Adultos"
                            error={errors.maxAdults}
                            min={1}
                            formControl={{
                                isInvalid:
                                    !!errors.maxAdults && touched.maxAdults,
                            }}
                            {...getFieldProps('maxAdults')}
                            onChange={handleChange('maxAdults')}
                        />
                        <InputNumberBox
                            label="Máximo de Crianças"
                            error={errors.maxChildren}
                            formControl={{
                                isInvalid:
                                    !!errors.maxChildren && touched.maxChildren,
                            }}
                            {...getFieldProps('maxChildren')}
                            onChange={handleChange('maxChildren')}
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
                            onChange={handleChange(
                                'chargeExtraAdultHigherThan',
                            )}
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
