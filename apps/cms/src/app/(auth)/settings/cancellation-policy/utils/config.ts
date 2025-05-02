import { CancellationPolicyFull, CancellationPolicyInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type CancellationPolicyFormData = CancellationPolicyInput

export const createCancellationPolicyInitialValues = (
    data?: CancellationPolicyFull | null,
): CancellationPolicyFormData => ({
    defaultPenaltyBy: data?.defaultPenaltyBy || 'RESERVATION_PERCENTAGE',
    defaultValue: data?.defaultValue || 1,
    withdrawalPeriod: data?.withdrawalPeriod || 1,
    applyCancellationTax: data?.applyCancellationTax || false,
    balancedModel: data?.balancedModel || '',
    dynamicDescription: data?.dynamicDescription || '',
    extraCancellationTax: data?.extraCancellationTax || false,
    flexModel: data?.flexModel || '',
    hardModel: data?.flexModel || '',
    moderateModel: data?.moderateModel || '',
    otherDescription: data?.otherDescription || '',
    penaltyRanges: Array.isArray(data?.penaltyRanges)
        ? data!.penaltyRanges.map((range) => ({
              id: range.id,
              daysBeforeCheckIn: range.daysBeforeCheckIn || 1,
              penaltyBy: range.penaltyBy,
              value: range.value || 1,
          }))
        : [],
})

export const cancellationPolicyFormSchema = yup.object({
    defaultPenaltyBy: yup
        .mixed()
        .oneOf([
            'RESERVATION_PERCENTAGE',
            'FULL_DAILIES_PERCENTAGE',
            'FIRST_NIGHT_AMOUNT',
        ])
        .required('Campo obrigatório'),
    defaultValue: yup
        .number()
        .max(100, 'Valor máximo de 100%')
        .required('Porcentagem é obrigatória'),
    withdrawalPeriod: yup.number().required('Campo obrigatório'),
    applyCancellationTax: yup.boolean().optional(),
    dynamicDescription: yup.string().required('Campo obrigatório'),
    extraCancellationTax: yup.boolean().optional(),
    otherDescription: yup.string().required('Campo obrigatório'),
    penaltyRanges: yup.array().of(
        yup.object({
            daysBeforeCheckIn: yup
                .number()
                .required('daysBeforeCheckIn é obrigatório'),
            penaltyBy: yup
                .mixed()
                .oneOf([
                    'RESERVATION_PERCENTAGE',
                    'FULL_DAILIES_PERCENTAGE',
                    'FIRST_NIGHT_AMOUNT',
                ])
                .required('penaltyBy é obrigatório'),
            value: yup
                .number()
                .max(100, 'Valor máximo de 100%')
                .required('value é obrigatório'),
        }),
    ),
})
