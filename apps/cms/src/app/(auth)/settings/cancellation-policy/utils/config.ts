import { CancellationPolicyFull, CancellationPolicyInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type CancellationPolicyFormData = CancellationPolicyInput

export const createCancellationPolicyInitialValues = (
    data?: CancellationPolicyFull,
): CancellationPolicyFormData => ({
    defaultPenaltyBy: data?.defaultPenaltyBy || 'RESERVATION_PERCENTAGE',
    defaultValue: data?.defaultValue || 0,
    penaltyRanges:
        data?.penaltyRanges.map((range) => ({
            id: range.id,
            daysBeforeCheckIn: range.daysBeforeCheckIn,
            penaltyBy: range.penaltyBy,
            value: range.value,
        })) || [],
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
    defaultValue: yup.number().when('defaultPenaltyBy', {
        is: (val: string) => val !== 'FIRST_NIGHT_AMOUNT',
        then: (schema) =>
            schema.required(
                'Valor padrão é obrigatório quando defaultPenaltyBy não é FIRST_NIGHT_AMOUNT',
            ),
        otherwise: (schema) => schema.optional(),
    }),
    penaltyRanges: yup.array().of(
        yup.object({
            id: yup.string().optional(),
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
            value: yup.number().required('value é obrigatório'),
        }),
    ),
})
