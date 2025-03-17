import { Flex, Stack, Text } from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'
import React from 'react'

import InputBox from '@/components/atoms/InputBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'

import { offerCouponsData } from './utils/config'

export const OfferCouponsForm: React.FC = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<offerCouponsData>()

    return (
        <Form>
            <Stack gap={8}>
                <Flex direction={'column'} gap={2}>
                    <InputBox
                        label="Nome da Oferta"
                        maxLength={250}
                        error={errors.description}
                        formControl={{
                            isInvalid:
                                !!errors.description && touched.description,
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
                    <Text as="h3">Periodos Validos</Text>

                    <Stack gap={2}></Stack>
                </section>
            </Stack>
        </Form>
    )
}
