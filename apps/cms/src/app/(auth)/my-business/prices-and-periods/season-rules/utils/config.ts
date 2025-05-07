import {
    HousingUnitTypePricingChangeInput,
    SeasonRuleCreateInput,
    SeasonRuleFull,
} from '@booksuite/sdk'
import dayjs from 'dayjs'
import * as yup from 'yup'

export type SeasonRuleFormData = Omit<
    SeasonRuleCreateInput,
    'validWeekDays'
> & {
    validWeekDays: string[]
}

export const transformFormDataForSubmit = (
    formData: SeasonRuleFormData,
): SeasonRuleCreateInput => {
    const { housingUnitTypePrices, validWeekDays, ...rest } = formData

    const transformedHousingUnitPrices: HousingUnitTypePricingChangeInput[] =
        housingUnitTypePrices.map((item) => ({
            housingUnitTypeId: item.housingUnitTypeId,
            baseWeekPrice: Number(item.baseWeekPrice) || 0,
            finalWeekPrice: Number(item.finalWeekPrice) || 0,
            baseWeekendPrice: Number(item.baseWeekendPrice) || 0,
            finalWeekendPrice: Number(item.finalWeekendPrice) || 0,
        }))

    const startDate = dayjs(formData.startDate)
    const endDate = dayjs(formData.endDate)

    if (!startDate.isValid() || !endDate.isValid()) {
        throw new Error('Datas inválidas')
    }

    return {
        ...rest,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        validWeekDays: validWeekDays.map(Number).filter((day) => !isNaN(day)),
        housingUnitTypePrices: transformedHousingUnitPrices,
        priceVariationValue: Number(formData.priceVariationValue) || 0,
    }
}

export const createFormInitialValues = (
    data?: SeasonRuleFull | null,
): SeasonRuleFormData => ({
    name: data?.name || '',
    published: data?.published || false,
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
    minStay: data?.minStay || 1,
    validWeekDays: data?.validWeekDays?.map(String) || [],
    priceVariationType: data?.priceVariationType || 'ABSOLUTE_INCREASE',
    priceVariationValue: data?.priceVariationValue || 0,
    housingUnitTypePrices: data?.housingUnitTypePrices || [],
})

export const seasonRuleFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    published: yup.boolean().required('Status é obrigatório'),
    startDate: yup.string().required('Data de início é obrigatória'),
    endDate: yup.string().required('Data de término é obrigatória'),
    minStay: yup
        .number()
        .min(1, 'Mínimo de diárias deve ser pelo menos 1')
        .required('Mínimo de diárias é obrigatório'),
    validWeekDays: yup
        .array()
        .of(yup.string().oneOf(['0', '1', '2', '3', '4', '5', '6']))
        .required('Dias da semana disponíveis são obrigatórios'),
    priceVariationType: yup.string().required('Tipo de variação é obrigatório'),
    priceVariationValue: yup.number().min(0).required('Preço é obrigatório'),
    housingUnitTypePrices: yup
        .array()
        .min(1, 'Pelo menos um tipo de unidade é obrigatório'),
})
