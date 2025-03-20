import { Company } from '@booksuite/sdk'
import * as yup from 'yup'

export type AddressFormData = Pick<
    Company,
    | 'stateRegistration'
    | 'municipalRegistration'
    | 'address'
    | 'number'
    | 'country'
    | 'state'
    | 'city'
>

export const createAddressInitialValues = (
    data?: Partial<Company>,
): AddressFormData => ({
    stateRegistration: data?.stateRegistration || null,
    municipalRegistration: data?.municipalRegistration || null,
    address: data?.address || '',
    number: data?.number || '',
    country: data?.country || '',
    state: data?.state || '',
    city: data?.city || '',
})

export const addressFormSchema = yup.object({
    stateRegistration: yup.string().nullable(),
    municipalRegistration: yup.string().nullable(),
    address: yup.string().required('O endereço é obrigatório'),
    number: yup.string().required('O número é obrigatório'),
    country: yup.string().required('O país é obrigatório'),
    state: yup.string().required('O estado é obrigatório'),
    city: yup.string().required('A cidade é obrigatória'),
})
