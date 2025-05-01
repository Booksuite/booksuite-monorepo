import { CompanyFull, CompanyUpdateInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type TaxInformationData = Pick<
    CompanyUpdateInput,
    | 'responsible'
    | 'responsibleEmail'
    | 'responsiblePhone'
    | 'municipalRegistration'
    | 'stateRegistration'
    | 'docType'
    | 'identification'
    | 'state'
    | 'city'
    | 'country'
    | 'zipcode'
    | 'companyName'
>

export const createTaxInformationInitialValues = (
    data?: Partial<CompanyFull> | null,
): TaxInformationData => ({
    responsible: data?.responsible || '',
    responsibleEmail: data?.responsibleEmail || '',
    responsiblePhone: data?.responsiblePhone || '',
    municipalRegistration: data?.municipalRegistration || null,
    stateRegistration: data?.stateRegistration || null,
    docType: data?.docType || '',
    identification: data?.identification || '',
    state: data?.state || '',
    city: data?.city || '',
    country: data?.country || '',
    zipcode: data?.zipcode || '',
    companyName: data?.companyName || '',
})

export const taxInformationSchema = yup.object({
    responsible: yup.string().required('Responsável é obrigatório'),
    responsibleEmail: yup
        .string()
        .email('E-mail inválido')
        .required('E-mail do responsável é obrigatório'),
    responsiblePhone: yup
        .string()
        .required('Telefone do responsável é obrigatório'),
    municipalRegistration: yup.string().nullable(),
    stateRegistration: yup.string().nullable(),
    docType: yup.string().required('Tipo de documento é obrigatório'),
    identification: yup.string().required('Identificação é obrigatória'),
    state: yup.string().required('Estado é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
    country: yup.string().required('País é obrigatório'),
    zipcode: yup.string().required('CEP é obrigátorio'),
    companyName: yup.string().optional(),
})
