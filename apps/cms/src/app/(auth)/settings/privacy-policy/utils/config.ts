import { CompanyFull } from '@booksuite/sdk'
import * as yup from 'yup'

export type PrivacyPolicyFormData = {
    privacyPolicyDescription: string
}

export const createPrivacyPolicyInitialValues = (
    data?: CompanyFull | null,
): PrivacyPolicyFormData => ({
    privacyPolicyDescription: data?.privacyPolicyDescription || '',
})

export const privacyPolicyFormSchema = yup.object({
    privacyPolicyDescription: yup
        .string()
        .required('Descrição da política de privacidade é obrigatória'),
})
