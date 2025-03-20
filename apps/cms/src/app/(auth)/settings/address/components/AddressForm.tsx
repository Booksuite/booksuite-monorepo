'use client'

import { Button, Stack } from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'

import InputBox from '@/components/atoms/InputBox'
import { AddressFormData } from '../utils/config'

export const AddressForm = () => {
    const { getFieldProps, touched, errors } =
        useFormikContext<AddressFormData>()

    return (
        <Form>
            <Stack spacing={4}>
                <InputBox
                    label="CEP"
                    /*error={errors.}
                    formControl={{
                        isInvalid: !!errors. && touched.,
                    }}
                    {...getFieldProps('')}*/
                />
                <InputBox
                    label="Endereço"
                    error={errors.address}
                    formControl={{
                        isInvalid: !!errors.address && touched.address,
                    }}
                    {...getFieldProps('address')}
                />
                <InputBox
                    label="Número"
                    error={errors.number}
                    formControl={{
                        isInvalid: !!errors.number && touched.number,
                    }}
                    {...getFieldProps('number')}
                />
                <InputBox
                    label="País"
                    error={errors.country}
                    formControl={{
                        isInvalid: !!errors.country && touched.country,
                    }}
                    {...getFieldProps('country')}
                />
                <InputBox
                    label="Estado"
                    error={errors.state}
                    formControl={{ isInvalid: !!errors.state && touched.state }}
                    {...getFieldProps('state')}
                />
                <InputBox
                    label="Cidade"
                    error={errors.city}
                    formControl={{ isInvalid: !!errors.city && touched.city }}
                    {...getFieldProps('city')}
                />
                <InputBox
                    label="Inscrição Estadual"
                    error={errors.stateRegistration}
                    formControl={{
                        isInvalid:
                            !!errors.stateRegistration &&
                            touched.stateRegistration,
                    }}
                    {...getFieldProps('stateRegistration')}
                />
                <InputBox
                    label="Inscrição Municipal"
                    error={errors.municipalRegistration}
                    formControl={{
                        isInvalid:
                            !!errors.municipalRegistration &&
                            touched.municipalRegistration,
                    }}
                    {...getFieldProps('municipalRegistration')}
                />
                <InputBox
                    label="URL no Google Maps"
                    /*error={errors.}
                    formControl={{
                        isInvalid: !!errors. && touched.,
                    }}
                    {...getFieldProps('')}*/
                />
                <Button type="submit">Salvar</Button>
            </Stack>
        </Form>
    )
}
