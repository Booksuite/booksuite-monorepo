import { CompanyFull } from '@booksuite/sdk'
import * as yup from 'yup'

export type AddressFormData = {
    stateRegistration: string
    municipalRegistration: string
    address: string
    number: string
    country: string
    state: string
    city: string
    zipcode: string
    mapCoordinates: { latitude: number; longitude: number }
}

export const createAddressInitialValues = (
    data?: Partial<CompanyFull> | null,
): AddressFormData => ({
    stateRegistration: data?.stateRegistration || '',
    municipalRegistration: data?.municipalRegistration || '',
    address: data?.address || '',
    number: data?.number || '',
    country: data?.country || '',
    state: data?.state || '',
    city: data?.city || '',
    zipcode: data?.zipcode || '',
    mapCoordinates: data?.mapCoordinates || { latitude: 0, longitude: 0 },
})

export const addressFormSchema = yup.object({
    stateRegistration: yup.string().nullable(),
    municipalRegistration: yup.string().nullable(),
    address: yup.string().required('O endereço é obrigatório'),
    number: yup.string().required('O número é obrigatório'),
    country: yup.string().required('O país é obrigatório'),
    state: yup.string().required('O estado é obrigatório'),
    city: yup.string().required('A cidade é obrigatória'),
    zipcode: yup.string().required('A cidade é obrigatória'),
    mapCoordinates: yup.object().required('Cordenadas são obrigatórias'),
})
