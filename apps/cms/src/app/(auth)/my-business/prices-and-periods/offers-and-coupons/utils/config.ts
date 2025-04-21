import {
    CreateOfferDto,
    OfferFull,
    OfferResponseDTOPriceAdjustmentType,
} from '@booksuite/sdk'
import * as yup from 'yup'

export type OfferFormData = CreateOfferDto

export const transformOfferFormDataForSubmit = (
    formData: OfferFormData,
): CreateOfferDto => {
    const {
        validStartDate,
        validEndDate,
        purchaseEndDate,
        purchaseStartDate,
        name,
        ...rest
    } = formData

    const validStartDateISO = validStartDate
        ? new Date(validStartDate).toISOString()
        : undefined
    const validEndDateISO = validEndDate
        ? new Date(validEndDate).toISOString()
        : undefined
    const purchaseStartDateISO = new Date(purchaseStartDate || '').toISOString()
    const purchaseEndDateISO = new Date(purchaseEndDate || '').toISOString()

    return {
        ...rest,
        name: name,
        purchaseEndDate: purchaseEndDateISO,
        purchaseStartDate: purchaseStartDateISO,
        validStartDate: validStartDateISO,
        validEndDate: validEndDateISO,
    }
}

export const createOfferFormInitialValues = (
    data?: OfferFull,
): OfferFormData => ({
    name: data?.name || '',
    description: data?.description || '',
    published: data?.published ?? false,
    purchaseStartDate: data?.purchaseStartDate.split('T').at(0) || '',
    purchaseEndDate: data?.purchaseEndDate.split('T').at(0) || '',
    validStartDate: data?.validStartDate
        ? String(data.validStartDate).split('T').at(0)
        : '',
    validEndDate: data?.validEndDate
        ? String(data.validEndDate).split('T').at(0)
        : '',
    minDays: data?.minDays ?? 0,
    maxDays: data?.maxDays ?? 0,
    minAdvanceDays: data?.minAdvanceDays ?? 0,
    maxAdvanceDays: data?.maxAdvanceDays ?? 0,
    validForAbandoned: data?.validForAbandoned ?? false,
    validForPackages: data?.validForPackages ?? false,
    availableWeekDays: data?.availableWeekDays || [],
    priceAdjustmentType: data?.priceAdjustmentType || 'ABSOLUTE_REDUCTION',
    priceAdjustmentValue: data?.priceAdjustmentValue ?? 0,
    showInHighlights: data?.showInHighlights ?? false,
    showDiscountTag: data?.showDiscountTag ?? false,
    isExclusive: data?.isExclusive ?? false,
    couponCode: data?.couponCode || '',
    availableHousingUnitTypes:
        data?.availableHousingUnitTypes.map(
            (type) => type.housingUnitType.id,
        ) || [],
    validServices:
        data?.validServices.map((service) => service.service.id) || [],
    validPaymentMethods: [],
})

export const offerFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    description: yup.string().nullable(),
    published: yup.boolean().required('Status é obrigatório'),
    purchaseStartDate: yup
        .string()
        .required('Data inicial de compra é obrigatória'),
    purchaseEndDate: yup
        .string()
        .required('Data final de compra é obrigatória'),
    validStartDate: yup.string().nullable(),
    validEndDate: yup.string().nullable(),
    minDays: yup.number().nullable(),
    maxDays: yup.number().nullable(),
    minAdvanceDays: yup.number().nullable(),
    maxAdvanceDays: yup.number().nullable(),
    validForAbandoned: yup.boolean().required(),
    validForPackages: yup.boolean().required(),
    availableWeekDays: yup
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
