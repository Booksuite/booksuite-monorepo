'use client'

import { Grid, GridItem, useToast } from '@chakra-ui/react'
import cep from 'cep-promise'
import { Form, useFormikContext } from 'formik'
import { debounce } from 'radash'
import { useEffect, useRef } from 'react'

import InputBox from '@/components/atoms/InputBox'
import type { AddressFormData } from '../utils/config'

export const AddressForm = () => {
    const toast = useToast()

    const {
        getFieldProps,
        touched,
        values,
        errors,
        setValues,
        isSubmitting,
        handleSubmit,
        setSubmitting,
    } = useFormikContext<AddressFormData>()

    const debouncedSearch = useRef(
        debounce({ delay: 500 }, async (search: string) => {
            setSubmitting(true)

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
            } catch {
                toast({
                    title: 'CEP inválido ou não encontrado.',
                    status: 'error',
                })
            } finally {
                setSubmitting(false)
            }
        }),
    )

    useEffect(() => {
        if (values.zipcode.length === 8) {
            debouncedSearch.current(values.zipcode)
        }
    }, [values.zipcode])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                <GridItem colSpan={12}>
                    <InputBox
                        label="CEP"
                        error={errors.zipcode}
                        formControl={{
                            isInvalid: !!errors.zipcode && touched.zipcode,
                        }}
                        isDisabled={isSubmitting}
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
            </Grid>
        </Form>
    )
}
