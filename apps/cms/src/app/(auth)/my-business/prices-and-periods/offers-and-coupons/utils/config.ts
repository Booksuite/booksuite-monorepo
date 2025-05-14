import {
    CreateOfferDto,
    OfferFull,
    OfferResponseDTOPriceAdjustmentType,
} from '@booksuite/sdk'
import dayjs from 'dayjs'
import * as yup from 'yup'

export type OfferFormData = CreateOfferDto & {
    hasMinStay: boolean
    hasMaxStay: boolean
    hasMinAdvanceDays: boolean
    hasMaxAdvanceDays: boolean
}

export const transformOfferFormDataForSubmit = (
    formData: OfferFormData,
): CreateOfferDto => {
    const {
        visibilityStartDate,
        startDate,
        endDate,
        hasMinStay,
        hasMaxStay,
        hasMinAdvanceDays,
        hasMaxAdvanceDays,
        ...rest
    } = formData

    const transformedData: CreateOfferDto = {
        ...rest,
        visibilityStartDate: dayjs(visibilityStartDate).toISOString(),
        startDate: startDate
            ? dayjs(startDate).toISOString()
            : dayjs().toISOString(),
        endDate: endDate ? dayjs(endDate).toISOString() : dayjs().toISOString(),
        minStay: hasMinStay ? formData.minStay : undefined,
        maxStay: hasMaxStay ? formData.maxStay : undefined,
        minAdvanceDays: hasMinAdvanceDays ? formData.minAdvanceDays : undefined,
        maxAdvanceDays: hasMaxAdvanceDays ? formData.maxAdvanceDays : undefined,
    }

    return transformedData
}

export const createOfferFormInitialValues = (
    data?: OfferFull,
): OfferFormData => ({
    name: data?.name || '',
    type: data?.type || 'HOUSING_UNIT_TYPE',
    description: data?.description || '',
    published: data?.published ?? false,
    visibilityStartDate: data?.visibilityStartDate.split('T').at(0) || '',
    startDate: data?.startDate.split('T').at(0) || '',
    endDate: data?.endDate.split('T').at(0) || '',
    hasMinStay: data?.minStay !== null && data?.minStay !== undefined,
    minStay: data?.minStay ?? undefined,
    hasMaxStay: data?.maxStay !== null && data?.maxStay !== undefined,
    maxStay: data?.maxStay ?? undefined,
    hasMinAdvanceDays:
        data?.minAdvanceDays !== null && data?.minAdvanceDays !== undefined,
    minAdvanceDays: data?.minAdvanceDays ?? undefined,
    hasMaxAdvanceDays:
        data?.maxAdvanceDays !== null && data?.maxAdvanceDays !== undefined,
    maxAdvanceDays: data?.maxAdvanceDays ?? undefined,
    validForAbandoned: data?.validForAbandoned ?? false,
    validForPackages: data?.validForPackages ?? false,
    validWeekDays: data?.validWeekDays || [],
    priceAdjustmentType: data?.priceAdjustmentType || 'ABSOLUTE_REDUCTION',
    priceAdjustmentValue: data?.priceAdjustmentValue ?? 0,
    showInHighlights: data?.showInHighlights ?? false,
    showDiscountTag: data?.showDiscountTag ?? false,
    isExclusive: data?.isExclusive ?? false,
    couponCode: data?.couponCode || '',
    validHousingUnitTypes:
        data?.validHousingUnitTypes.map((type) => type.housingUnitType.id) ||
        [],
    validServices:
        data?.validServices.map((service) => service.service.id) || [],
    validPaymentMethods: [],
})

export const offerFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    description: yup.string().nullable(),
    published: yup.boolean().required('Status é obrigatório'),
    visibilityStartDate: yup
        .string()
        .required('Data inicial de compra é obrigatória'),
    startDate: yup.string().nullable(),
    endDate: yup.string().nullable(),
    validForAbandoned: yup.boolean().required(),
    validForPackages: yup.boolean().required(),
    validWeekDays: yup
        .array()
        .of(yup.number().min(0).max(6))
        .required('Dias disponíveis são obrigatórios'),
    priceAdjustmentType: yup
        .mixed<OfferResponseDTOPriceAdjustmentType>()
        .oneOf([
            'ABSOLUTE_INCREASE',
            'ABSOLUTE_REDUCTION',
            'PERCENTAGE_INCREASE',
            'PERCENTAGE_REDUCTION',
            'CUSTOM',
        ])
        .required('Tipo de ajuste de preço é obrigatório'),
    priceAdjustmentValue: yup
        .number()
        .required('Valor de ajuste de preço é obrigatório'),
    showInHighlights: yup.boolean().required(),
    showDiscountTag: yup.boolean().required(),
    isExclusive: yup.boolean().required(),
    couponCode: yup.string().nullable(),
})
