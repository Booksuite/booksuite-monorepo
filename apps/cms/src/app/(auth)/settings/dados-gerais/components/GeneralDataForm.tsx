'use client'

import { Flex, Stack } from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'
import React from 'react'

import InputBox from '@/components/atoms/InputBox'
import { GeneralData } from '../utils/config'

export const GeneralDataForm: React.FC = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<GeneralData>()

    return (
        <Form>
            <Stack gap={2}>
                <Flex direction="column">
                    <InputBox
                        label="Nome da Propriedade"
                        error={errors.name}
                        formControl={{
                            isInvalid: !!errors.name && touched.name,
                        }}
                        {...getFieldProps('name')}
                    />
                </Flex>
            </Stack>
        </Form>
    )
}
