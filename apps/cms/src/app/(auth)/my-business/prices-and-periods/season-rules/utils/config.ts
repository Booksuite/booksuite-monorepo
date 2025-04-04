import {
    SeasonRuleFull,
    SeasonRuleHousingUnitType,
    SeasonRuleHousingUnitTypePriceInput,
    SeasonRuleInput,
} from '@booksuite/sdk'
import * as yup from 'yup'

export type SeasonRuleFormData = Omit<
    SeasonRuleInput,
    'housingUnitTypePrices' | 'availableWeekend'
> & {
    housingUnitTypePrices: SeasonRuleHousingUnitType[]
    availableWeekend: string[]
}

export const transformFormDataForSubmit = (
    formData: SeasonRuleFormData,
): SeasonRuleInput => {
    const { housingUnitTypePrices, availableWeekend, ...rest } = formData

    const transformedHousingUnitPrices: SeasonRuleHousingUnitTypePriceInput[] =
        housingUnitTypePrices.map((item) => ({
            housingUnitTypeId: item.housingUnitType.id,
            housingUnitType: {
                id: item.housingUnitType.id,
                name: item.housingUnitType.name,
            },
            baseWeekPrice: item.baseWeekPrice,
            newWeekPrice: item.newWeekPrice,
            weekendBasePrice: item.weekendBasePrice,
            weekendNewPrice: item.weekendNewPrice,
        }))

    return {
        ...rest,
        availableWeekend: availableWeekend.map(Number),
        housingUnitTypePrices: transformedHousingUnitPrices,
    }
}

export const createFormInitialValues = (
    data?: SeasonRuleFull,
): SeasonRuleFormData => ({
    name: data?.name || '',
    published: data?.published || false,
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
    minDaily: data?.minDaily || 1,
    availableWeekend: data?.availableWeekend?.map(String) || [],
    priceVariationType: data?.priceVariationType || 'ABSOLUTE_INCREASE',
    price: data?.price || 0,
    housingUnitTypePrices: data?.housingUnitTypePrices || [],
})

export const seasonRuleFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    published: yup.boolean().required('Status é obrigatório'),
    startDate: yup.string().required('Data de início é obrigatória'),
    endDate: yup.string().required('Data de término é obrigatória'),
    minDaily: yup
        .number()
        .min(1, 'Mínimo de diárias deve ser pelo menos 1')
        .required('Mínimo de diárias é obrigatório'),
    availableWeekend: yup.array().required('Finais de semana são obrigatórios'),
    priceVariationType: yup.string().required('Tipo de variação é obrigatório'),
    price: yup.number().min(0).required('Preço é obrigatório'),
    housingUnitTypePrices: yup
        .array()
        .min(1, 'Pelo menos um tipo de unidade é obrigatório'),
})
