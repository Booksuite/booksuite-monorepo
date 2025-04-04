import { ReservationOptionInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type ReservationOptionData = Omit<
    ReservationOptionInput,
    'availableWeekend'
> & {
    availableWeekend: string[]
}

export const createReservationOptionFormInitialValues = (
    data?: ReservationOptionInput | null,
): ReservationOptionData => ({
    name: data?.name || '',
    published: data?.published || false,
    additionalAdultPrice: data?.additionalAdultPrice || 0,
    additionalChildrenPrice: data?.additionalChildrenPrice || 0,
    ageGroupPrices: data?.ageGroupPrices || [],
    availableHousingUnitTypes: data?.availableHousingUnitTypes || [],
    availableWeekend: data?.availableWeekend.map(String) || [],
    billingType: data?.billingType || 'DAILY',
    includedItems: data?.includedItems || [],
})

export const reservationOptionFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    published: yup.boolean().required('Status é obrigatório'),
    additionalAdultPrice: yup
        .number()
        .min(0)
        .required('Preço do adulto adicional é obrigatório'),
    additionalChildrenPrice: yup
        .number()
        .min(0)
        .required('Preço da criança adicional é obrigatório'),
    ageGroupPrices: yup.array().min(1, 'Grupo de idade é obrigatório'),
    availableHousingUnitTypes: yup
        .array()
        .min(1, 'Tipos de unidade habitacional são obrigatórios'),
    availableWeekend: yup
        .array()
        .min(1, 'Dias de fim de semana disponíveis são obrigatórios'),
    billingType: yup.string().required('Tipo de cobrança é obrigatório'),
    includedItems: yup.array().min(1, 'Itens incluídos são obrigatórios'),
})
