'use client'

import { Grid, TextField } from '@mui/material'
import cep from 'cep-promise'
import { useFormikContext } from 'formik'
import { useSnackbar } from 'notistack'
import { debounce } from 'radash'
import { useEffect, useRef } from 'react'

import { FormContainer } from '@/components/atoms/FormContainer'
import type { AddressFormData } from '../utils/config'

export const AddressForm = () => {
    const { enqueueSnackbar } = useSnackbar()

    const {
        getFieldProps,
        touched,
        values,
        errors,
        setValues,
        isSubmitting,
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

                enqueueSnackbar('CEP encontrado!', { variant: 'success' })
            } catch {
                enqueueSnackbar('CEP inválido ou não encontrado.', {
                    variant: 'error',
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
        <FormContainer>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <TextField
                        label="CEP"
                        error={touched.zipcode && Boolean(errors.zipcode)}
                        helperText={touched.zipcode && errors.zipcode}
                        disabled={isSubmitting}
                        fullWidth
                        {...getFieldProps('zipcode')}
                    />
                </Grid>

                <Grid size={4}>
                    <TextField
                        label="Cidade"
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city && errors.city}
                        disabled={isSubmitting}
                        fullWidth
                        {...getFieldProps('city')}
                    />
                </Grid>

                <Grid size={4}>
                    <TextField
                        label="Estado"
                        error={touched.state && Boolean(errors.state)}
                        helperText={touched.state && errors.state}
                        disabled={isSubmitting}
                        fullWidth
                        {...getFieldProps('state')}
                    />
                </Grid>

                <Grid size={4}>
                    <TextField
                        label="País"
                        error={touched.country && Boolean(errors.country)}
                        helperText={touched.country && errors.country}
                        disabled={isSubmitting}
                        fullWidth
                        {...getFieldProps('country')}
                    />
                </Grid>

                <Grid size={6}>
                    <TextField
                        label="Endereço"
                        error={touched.address && Boolean(errors.address)}
                        helperText={touched.address && errors.address}
                        disabled={isSubmitting}
                        fullWidth
                        {...getFieldProps('address')}
                    />
                </Grid>

                <Grid size={6}>
                    <TextField
                        label="Número"
                        error={touched.number && Boolean(errors.number)}
                        helperText={touched.number && errors.number}
                        disabled={isSubmitting}
                        fullWidth
                        {...getFieldProps('number')}
                    />
                </Grid>
            </Grid>
        </FormContainer>
    )
}
