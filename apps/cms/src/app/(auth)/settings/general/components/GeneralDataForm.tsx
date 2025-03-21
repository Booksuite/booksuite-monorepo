'use client'

import { Button, Flex, Select, Stack } from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'
import React from 'react'

import InputBox from '@/components/atoms/InputBox'
import { GeneralData } from '../utils/config'
import { BRAZIL_TIMEZONES, COMPANY_TYPES } from '../utils/constants'

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

                <Flex direction="column">
                    <Select
                        value={getFieldProps('type').value}
                        onChange={(selectedOption) =>
                            setFieldValue('type', selectedOption.target.value)
                        }
                    >
                        {Object.entries(COMPANY_TYPES).map(([label, value]) => (
                            <option key={label} value={label}>
                                {value}
                            </option>
                        ))}
                    </Select>
                </Flex>

                <Flex direction="column">
                    <Select
                        value={getFieldProps('timezone').value}
                        onChange={(selectedOption) => {
                            setFieldValue(
                                'timezone',
                                selectedOption.target.value,
                            )
                        }}
                    >
                        {Object.entries(BRAZIL_TIMEZONES).map(
                            ([label, value]) => (
                                <option key={label} value={value}>
                                    {value}
                                </option>
                            ),
                        )}
                    </Select>
                </Flex>
                <Button type="submit" size="lg">
                    Salvar
                </Button>
            </Stack>
        </Form>
    )
}
