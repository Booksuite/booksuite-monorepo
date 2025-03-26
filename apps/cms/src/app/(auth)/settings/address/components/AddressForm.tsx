'use client'

import { Button, Grid, GridItem, useToast } from '@chakra-ui/react'
import cep from 'cep-promise'
import { Form, useFormikContext } from 'formik'
import router from 'next/router'
import { debounce } from 'radash'
import { useEffect, useRef, useState } from 'react'

import InputBox from '@/components/atoms/InputBox'
import type { AddressFormData } from '../utils/config'

export const AddressForm = () => {
    const toast = useToast()
    const { getFieldProps, touched, values, errors, setValues } =
        useFormikContext<AddressFormData>()

    const [zipcodeError, setZipcodeError] = useState<string | null>(null)
    const [isSearching, setIsSearching] = useState(false)

    const debouncedSearch = useRef(
        debounce({ delay: 800 }, async (search: string) => {
            setIsSearching(true)
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
            } finally {
                setIsSearching(false)
            }
        }),
    )

    useEffect(() => {
        if (values.zipcode.length === 8) {
            debouncedSearch.current(values.zipcode)
        }
    }, [values.zipcode])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSearching(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))

            toast({
                title: 'Formulário enviado com sucesso!',
                status: 'success',
            })
            router.push('/settings')
        } finally {
            setIsSearching(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                <GridItem colSpan={12}>
                    <InputBox
                        label="CEP"
                        error={zipcodeError || errors.zipcode}
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
                        isDisabled={isSearching}
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
                        isDisabled={isSearching}
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
                        isDisabled={isSearching}
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
                        isDisabled={isSearching}
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
                        isDisabled={isSearching}
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
                        isLoading={isSearching}
                        isDisabled={isSearching}
                    >
                        Salvar
                    </Button>
                </GridItem>
            </Grid>
        </Form>
    )
}
