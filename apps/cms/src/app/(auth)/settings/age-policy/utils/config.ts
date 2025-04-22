import { AgePolicyFull, AgePolicyInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type AgePolicyFormData = AgePolicyInput & {
    id: string
}

export const createAgePolicyInitialValues = (
    data?: Partial<AgePolicyFull>,
): AgePolicyFormData => ({
    acceptChildren: data?.acceptChildren || false,
    adultMinAge: data?.adultMinAge || 0,
    ageGroups:
        data?.ageGroups?.map((group) => ({
            id: group.id,
            initialAge: group.initialAge,
            finalAge: group.finalAge,
            chargeType: group.chargeType,
            value: group.value || 0,
        })) || [],
})

export const agePolicyFormSchema = yup.object({
    id: yup.string().optional(),
    acceptChildren: yup.boolean().required('Campo obrigatório'),
    adultMinAge: yup
        .number()
        .required('Idade mínima para adultos é obrigatória'),
    ageGroups: yup.array().of(
        yup.object({
            initialAge: yup
                .number()
                .required('Idade mínima do grupo é obrigatória')
                .min(0, 'A idade mínima deve ser pelo menos 0'),
            finalAge: yup
                .number()
                .required('Idade máxima do grupo é obrigatória')
                .min(
                    yup.ref('initialAge'),
                    'A idade máxima deve ser maior que a mínima',
                ),
            chargeType: yup.string().required('Tipo de cobrança é obrigatório'),
            value: yup.number().required('Preço de cobrança obrigátorio'),
        }),
    ),
})
