'use client'

import { Button, Grid, GridItem, useToast } from '@chakra-ui/react'
import cep from 'cep-promise'
import { Form, useFormikContext } from 'formik'
import { debounce } from 'radash'
import { useEffect, useRef } from 'react'

import InputBox from '@/components/atoms/InputBox'
import type { AddressFormData } from '../utils/config'

export const AddressForm = () => {
    const toast = useToast()

    const { getFieldProps, setFieldValue, touched, values, errors } =
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
        debouncedSearch.current(values.zipcode)
    }, [debouncedSearch, values.zipcode])

    return (
        <Form>
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                <GridItem colSpan={12}>
                    <InputBox
                        label="CEP"
                        {...getFieldProps('zipcode')}
                        onChange={(e) => {
                            getFieldProps('zipcode').onChange(e)
                        }}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 12, md: 4 }}>
                    <InputBox
                        label="Cidade"
                        error={errors.city}
                        formControl={{
                            isInvalid: !!errors.city && touched.city,
                        }}
                        {...getFieldProps('city')}
                    />
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 4 }}>
                    <InputBox
                        label="Estado"
                        error={errors.state}
                        formControl={{
                            isInvalid: !!errors.state && touched.state,
                        }}
                        {...getFieldProps('state')}
                    />
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 4 }}>
                    <InputBox
                        label="País"
                        error={errors.country}
                        formControl={{
                            isInvalid: !!errors.country && touched.country,
                        }}
                        {...getFieldProps('country')}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 12, md: 6 }}>
                    <InputBox
                        label="Endereço"
                        error={errors.address}
                        formControl={{
                            isInvalid: !!errors.address && touched.address,
                        }}
                        {...getFieldProps('address')}
                    />
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 6 }}>
                    <InputBox
                        label="Número"
                        error={errors.number}
                        formControl={{
                            isInvalid: !!errors.number && touched.number,
                        }}
                        {...getFieldProps('number')}
                    />
                </GridItem>

                <GridItem colSpan={12}>
                    <InputBox
                        label="URL no Google Maps"
                        /*
                        ( TODO - Mostrar mapa)
                        error={errors.googleMapsUrl}
                        formControl={{
                            isInvalid: !!errors.googleMapsUrl && touched.googleMapsUrl,
                        }}
                        {...getFieldProps('googleMapsUrl')}*/
                    />
                </GridItem>

                <GridItem colSpan={12}>
                    <Button type="submit" size="lg" width="100%">
                        Salvar
                    </Button>
                </GridItem>
            </Grid>
        </Form>
    )
}
