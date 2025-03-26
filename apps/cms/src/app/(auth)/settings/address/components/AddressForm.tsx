'use client'

import { Button, Grid, GridItem, useToast } from '@chakra-ui/react'
import cep from 'cep-promise'
import { Form, useFormikContext } from 'formik'
import { debounce } from 'radash'
import { useEffect, useRef, useState } from 'react'

import InputBox from '@/components/atoms/InputBox'
import type { AddressFormData } from '../utils/config'

export const AddressForm = () => {
    const toast = useToast()
    const { getFieldProps, touched, values, errors, setValues, isSubmitting } =
        useFormikContext<AddressFormData>()

    const [zipcodeError, setZipcodeError] = useState<string | null>(null)

    const debouncedSearch = useRef(
        debounce({ delay: 800 }, async (search: string) => {
            try {
                const address = await cep(search)

                setValues((prev) => ({
                    ...prev,
                    city: address.city || '',
                    state: address.state || '',
                    country: 'Brasil',
                    address: address.street || '',
                }))

                toast({ title: 'CEP encontrado!', status: 'success' })
                setZipcodeError(null)
            } catch {
                setZipcodeError('CEP inválido ou não encontrado.')
            }
        }),
    )

    useEffect(() => {
        if (values.zipcode.length === 8) {
            debouncedSearch.current(values.zipcode)
        }
    }, [values.zipcode])

    return (
        <Form>
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                <GridItem colSpan={12}>
                    <InputBox
                        label="CEP"
                        error={zipcodeError || errors.zipcode}
                        isDisabled={isSubmitting}
                        formControl={{
                            isInvalid:
                                !!zipcodeError ||
                                (!!errors.zipcode && touched.zipcode),
                        }}
                        {...getFieldProps('zipcode')}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 12, md: 4 }}>
                    <InputBox
                        label="Cidade"
                        error={errors.city}
                        formControl={{
                            isInvalid: !!errors.city && touched.city,
                        }}
                        isDisabled={isSubmitting}
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
                        isDisabled={isSubmitting}
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
                        isDisabled={isSubmitting}
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
                        isDisabled={isSubmitting}
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
                        isDisabled={isSubmitting}
                        {...getFieldProps('number')}
                    />
                </GridItem>

                <GridItem colSpan={12}>
                    <InputBox
                        label="URL no Google Maps"
                        /* ( TODO - Mostrar mapa)
                        error={errors.mapCoordinates}
                        formControl={{ isInvalid: !!errors.mapCoordinates && touched.mapCoordinates }}
                        {...getFieldProps('mapCoordinates')}*/
                    />
                </GridItem>

                <GridItem colSpan={12}>
                    <Button
                        type="submit"
                        size="lg"
                        width="100%"
                        isLoading={isSubmitting}
                        isDisabled={isSubmitting}
                    >
                        Salvar
                    </Button>
                </GridItem>
            </Grid>
        </Form>
    )
}
