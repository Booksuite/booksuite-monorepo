import {
    CompanyFull,
    CompanySettingsInput,
    CompanyUpdateInput,
    Media,
} from '@booksuite/sdk'
import * as yup from 'yup'

export type visualIdentityFormData = Pick<
    CompanyUpdateInput,
    'favIcon' | 'logo' | 'settings'
> & {
    favIcon: string
    logo: string
    settings: CompanySettingsInput
    medias: Media[]
}

export const createvisualIdentityInitialValues = (
    data?: Partial<CompanyFull> | null,
): visualIdentityFormData => ({
    favIcon: data?.favIcon || '',
    logo: data?.logo || '',
    settings: data?.settings || {},
    medias: [],
})

export const visualIdentityFormSchema = yup.object({
    logo: yup.string(),
    favIcon: yup.string(),
})
