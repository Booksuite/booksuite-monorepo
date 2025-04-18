import {
    HousingUnitTypePricingChangeInput,
    SeasonRuleCreateInput,
    SeasonRuleFull,
} from '@booksuite/sdk'
import * as yup from 'yup'

export type SeasonRuleFormData = Omit<
    SeasonRuleCreateInput,
    'housingUnitTypePrices' | 'availableWeekDays'
> & {
    housingUnitTypePrices: HousingUnitTypePricingChangeInput[]
    availableWeekDays: string[]
}

export const transformFormDataForSubmit = (
    formData: SeasonRuleFormData,
): SeasonRuleCreateInput => {
    const { housingUnitTypePrices, availableWeekDays, ...rest } = formData

    const transformedHousingUnitPrices: HousingUnitTypePricingChangeInput[] =
        housingUnitTypePrices.map((item) => ({
            housingUnitTypeId: item.housingUnitTypeId,
            baseWeekPrice: item.baseWeekPrice,
            finalWeekPrice: item.finalWeekPrice,
            baseWeekendPrice: item.baseWeekendPrice,
            finalWeekendPrice: item.finalWeekendPrice,
        }))

    return {
        ...rest,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        availableWeekDays: availableWeekDays.map(Number),
        housingUnitTypePrices: transformedHousingUnitPrices,
    }
}

export const createFormInitialValues = (
    data?: SeasonRuleFull | null,
): SeasonRuleFormData => ({
    name: data?.name || '',
    published: data?.published || false,
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
    minDaily: data?.minDaily || 1,
    availableWeekDays: data?.availableWeekDays?.map(String) || [],
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
    availableWeekDays: yup
        .array()
        .of(yup.string().oneOf(['0', '1', '2', '3', '4', '5', '6']))
        .required('Dias da semana disponíveis são obrigatórios'),
    priceVariationType: yup.string().required('Tipo de variação é obrigatório'),
    price: yup.number().min(0).required('Preço é obrigatório'),
    housingUnitTypePrices: yup
        .array()
        .min(1, 'Pelo menos um tipo de unidade é obrigatório'),
})
