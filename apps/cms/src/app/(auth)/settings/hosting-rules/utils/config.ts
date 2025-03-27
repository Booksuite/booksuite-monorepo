import { HostingRulesInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type HostingRulesData = HostingRulesInput

export const createHostingRulesInitialValues = (
    data?: HostingRulesInput | null,
): HostingRulesData => ({
    availableWeekDays: data?.availableWeekDays || [],
    availableWeekend: data?.availableWeekend || [],
    checkIn: data?.checkIn || 0,
    checkOut: data?.checkOut || 0,
    minDaily: data?.minDaily || 0,
    fixedWindowPeriod: data?.fixedWindowPeriod || 0,
    reservationWindowEnd: data?.reservationWindowEnd || '',
    reservationWindowStart: data?.reservationWindowStart || '',
})

// export const hostingRulesDataSchema = yup.object({
//     availableWeekDays: yup
//         .array()
//         .of(yup.string())
//         .optional(),
//     availableWeekend: yup
//         .array()
//         .of(yup.string())
//         .optional(),
//     checkIn: yup
//         .number()
//         .min(0, 'Check-in deve ser maior ou igual a 0')
//         .required('Check-in é obrigatório'),
//     checkOut: yup
//         .number()
//         .min(0, 'Check-out deve ser maior ou igual a 0')
//         .required('Check-out é obrigatório'),
//     fixedWindowPeriod: yup
//         .number()
//         .min(1, 'Janela de dias deve ser um valor maior que 1')
//         .required('Janela de dias obrigatória'),
//     hostingOnSpecificDays: yup
//         .boolean()
//         .required('Definição de hospedagem em dias específicos é obrigatória'),

//     minDaily: yup
//         .number()
//         .min(0, 'Mínimo de diárias deve ser maior ou igual a 0')
//         .required('Mínimo de diárias é obrigatório'),

//     reservationWindowStart: yup.string().optional(),
//     reservationWindowEnd: yup.string().optional(),
// })
