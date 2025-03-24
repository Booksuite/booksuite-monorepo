import { CompanyFull, CompanyUpdateInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type visualIdentityFormData = Pick<
    CompanyUpdateInput,
    | 'favIcon'
    | 'logo'
>

export const createAddressInitialValues = (
    data?: Partial<CompanyFull> | null,
): visualIdentityFormData => ({
    favIcon: data?.favIcon,
    logo: data?.logo
})

export const addressFormSchema = yup.object({
    logo: yup.string(),
    favIcon: yup.string(),
})
