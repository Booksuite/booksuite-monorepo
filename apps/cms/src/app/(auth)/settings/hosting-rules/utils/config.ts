import { HostingRulesInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type HostingRulesData = Omit<
    HostingRulesInput,
    'availableWeekDays' | 'availableWeekend'
> & {
    availableWeekDays: string[]
    availableWeekend: string[]
}

export const transformFormDataForSubmit = (
    formData: HostingRulesData,
): HostingRulesInput => {
    const { availableWeekDays, availableWeekend, checkIn, checkOut, ...rest } =
        formData

    return {
        ...rest,
        availableWeekDays: availableWeekDays.map(Number),
        availableWeekend: availableWeekend.map(Number),
        checkIn: checkIn * 60,
        checkOut: checkOut * 60,
    }
}

export const createHostingRulesInitialValues = (
    data?: HostingRulesInput | null,
): HostingRulesData => ({
    availableWeekDays: data?.availableWeekDays?.map(String) || [],
    availableWeekend: data?.availableWeekend?.map(String) || [],
    checkIn: data?.checkIn ? data?.checkIn / 60 : 0,
    checkOut: data?.checkOut ? data.checkOut / 60 : 0,
    minDaily: data?.minDaily ?? 0,
    fixedWindowPeriod: data?.fixedWindowPeriod ?? 0,
    reservationWindowEnd: data?.reservationWindowEnd ?? null,
    reservationWindowStart: data?.reservationWindowStart ?? null,
})

export const hostingRulesDataSchema = yup.object({
    availableWeekDays: yup.array().optional(),
    availableWeekend: yup.array().optional(),
    checkIn: yup
        .number()
        .min(0, 'Check-in deve ser maior ou igual a 0')
        .required('Check-in é obrigatório'),
    checkOut: yup
        .number()
        .min(0, 'Check-out deve ser maior ou igual a 0')
        .required('Check-out é obrigatório'),
    fixedWindowPeriod: yup
        .number()
        .min(1, 'Janela de dias deve ser um valor maior que 1')
        .required('Janela de dias obrigatória'),
    minDaily: yup
        .number()
        .min(0, 'Mínimo de diárias deve ser maior ou igual a 0')
        .required('Mínimo de diárias é obrigatório'),

    reservationWindowStart: yup.string().optional().nullable(),
    reservationWindowEnd: yup.string().optional().nullable(),
})
