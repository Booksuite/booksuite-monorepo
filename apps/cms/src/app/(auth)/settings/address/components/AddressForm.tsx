'use client'

import { Button, Stack, useToast } from '@chakra-ui/react'
import cep from 'cep-promise'
import { Form, useFormikContext } from 'formik'
import { debounce } from 'radash'
import { useEffect, useRef, useState } from 'react'

import InputBox from '@/components/atoms/InputBox'
import { AddressFormData } from '../utils/config'

export const AddressForm = () => {
    const [searchInputValue, setSearchInputValue] = useState<string>('')
    const toast = useToast()

    const { getFieldProps, setFieldValue, touched, errors } =
        useFormikContext<AddressFormData>()

    const debouncedSearch = useRef(
        debounce({ delay: 800 }, (search: string) => {
            cep(search)
                .then((address) => {
                    setFieldValue('city', address.city)
                    setFieldValue('state', address.state)
                    setFieldValue('address', address.street)
                    setFieldValue('country', 'Brasil')
                    setFieldValue('zipcode', address.cep)
                    toast({ title: 'CEP encontrado', status: 'success' })
                })
                .catch(() => {
                    toast({ title: 'CEP não encontrado' })
                })
        }),
    )

    useEffect(() => {
        if (searchInputValue) {
            debouncedSearch.current(searchInputValue)
        }
    }, [debouncedSearch, searchInputValue])

    return (
        <Form>
            <Stack spacing={4}>
                <InputBox
                    label="CEP"
                    {...getFieldProps('zipcode')}
                    onChange={(e) => {
                        setSearchInputValue(e.target.value)
                        getFieldProps('zipcode').onChange(e)
                    }}
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
                <Button type="submit" size="lg">
                    Salvar
                </Button>
            </Stack>
        </Form>
    )
}
