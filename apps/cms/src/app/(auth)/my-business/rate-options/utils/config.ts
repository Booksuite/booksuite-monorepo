import {
    RateOptionFull,
    RateOptionInput,
    RateOptionUpdateInput,
} from '@booksuite/sdk'
import * as yup from 'yup'

export const transformRateOptionUpdateToInput = (
    data: RateOptionData,
): RateOptionInput => {
    return {
        name: data.name ?? '',
        published: data.published ?? false,
        billingType: data.billingType ?? 'DAILY',
        additionalAdultPrice: data.additionalAdultPrice ?? 0,
        additionalChildrenPrice: data.additionalChildrenPrice ?? 0,
        availableWeekend: data.availableWeekend.map(Number) ?? [],
        availableHousingUnitTypes: data.availableHousingUnitTypes ?? [],
        ageGroupPrices: data.ageGroupPrices ?? [],
        includedItems: data.includedItems ?? [],
    }
}

export type RateOptionData = Omit<RateOptionUpdateInput, 'availableWeekend'> & {
    availableWeekend: string[]
}

export const createRateOptionFormInitialValues = (
    data?: RateOptionFull | null,
): RateOptionData => ({
    name: data?.name || '',
    published: data?.published || false,
    additionalAdultPrice: data?.additionalAdultPrice || 0,
    additionalChildrenPrice: data?.additionalChildrenPrice || 0,
    ageGroupPrices:
        data?.ageGroupPrices.map((a) => ({
            ageGroupId: a.ageGroup.id || '',
            price: a.price || 0,
        })) || [],
    availableHousingUnitTypes: data?.availableHousingUnitTypes || [],
    availableWeekend: data?.availableWeekend.map(String) || [],
    billingType: data?.billingType || 'DAILY',
    includedItems: data?.includedItems || [],
})

export const rateOptionFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    published: yup.boolean().required('Status é obrigatório'),
    additionalAdultPrice: yup
        .number()
        .min(0, 'Preço por adulto adicional deve ser maior ou igual a zero')
        .required('Preço do adulto adicional é obrigatório'),
    additionalChildrenPrice: yup
        .number()
        .min(0, 'Preço por criança adicional deve ser maior ou igual a zero')
        .required('Preço da criança adicional é obrigatório'),
    ageGroupPrices: yup.array().of(
        yup.object({
            price: yup
                .number()
                .min(
                    0,
                    'Preço por faixa etária deve ser maior ou igual a zero',
                ),
        }),
    ),
    availableHousingUnitTypes: yup
        .array()
        .min(1, 'No mínimo uma acomodação deve ser selecionada'),
    availableWeekend: yup
        .array()
        .min(1, 'Dias de fim de semana disponíveis são obrigatórios'),
    billingType: yup.string().required('Tipo de cobrança é obrigatório'),
    includedItems: yup.array(),
})
