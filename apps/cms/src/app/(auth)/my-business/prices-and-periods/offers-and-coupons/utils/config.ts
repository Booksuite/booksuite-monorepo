import {
    CreateOfferDto,
    Offer,
    OfferResponseDTOPriceAdjustmentType,
} from '@booksuite/sdk'
import * as yup from 'yup'

export type OfferFormData = Omit<
    Offer,
    'id' | 'createdAt' | 'updatedAt' | 'validStartDate' | 'validEndDate'
> & {
    validStartDate: string | null
    validEndDate: string | null
    availableHousingUnitTypes: Array<{
        housingUnitType: {
            id: string
            name: string
            weekdaysPrice: number | null
            weekendPrice: number | null
        }
        baseWeekPrice: number
        newWeekPrice: number
        weekendBasePrice: number
        weekendNewPrice: number
        id: string
        seasonRuleId: string
    }>
    validServices: string[]
}

export const transformOfferFormDataForSubmit = (
    formData: OfferFormData,
): CreateOfferDto => {
    const {
        validStartDate,
        validEndDate,
        description,
        minDays,
        maxDays,
        minAdvanceDays,
        maxAdvanceDays,
        couponCode,
        availableHousingUnitTypes,
        validServices,
        ...rest
    } = formData

    const validStartDateISO = validStartDate
        ? new Date(validStartDate).toISOString()
        : undefined
    const validEndDateISO = validEndDate
        ? new Date(validEndDate).toISOString()
        : undefined
    const purchaseStartDateISO = new Date(
        formData.purchaseStartDate,
    ).toISOString()
    const purchaseEndDateISO = new Date(formData.purchaseEndDate).toISOString()

    return {
        ...rest,
        description: description || undefined,
        validStartDate: validStartDateISO,
        validEndDate: validEndDateISO,
        purchaseStartDate: purchaseStartDateISO,
        purchaseEndDate: purchaseEndDateISO,
        minDays: minDays || undefined,
        maxDays: maxDays || undefined,
        minAdvanceDays: minAdvanceDays || undefined,
        maxAdvanceDays: maxAdvanceDays || undefined,
        couponCode: couponCode || undefined,
        validServices,
        validPaymentMethods: [],
        availableHousingUnitTypes: availableHousingUnitTypes.map(
            (h) => h.housingUnitType.id,
        ),
    }
}

export const createOfferFormInitialValues = (
    data?: Partial<Offer>,
): OfferFormData => ({
    name: data?.name || '',
    description: data?.description || '',
    published: data?.published ?? false,
    purchaseStartDate: data?.purchaseStartDate || '',
    purchaseEndDate: data?.purchaseEndDate || '',
    validStartDate: data?.validStartDate ? String(data.validStartDate) : null,
    validEndDate: data?.validEndDate ? String(data.validEndDate) : null,
    minDays: data?.minDays ?? null,
    maxDays: data?.maxDays ?? null,
    minAdvanceDays: data?.minAdvanceDays ?? null,
    maxAdvanceDays: data?.maxAdvanceDays ?? null,
    validForAbandoned: data?.validForAbandoned ?? false,
    validForPackages: data?.validForPackages ?? false,
    availableWeekDays: data?.availableWeekDays || [],
    priceAdjustmentType: data?.priceAdjustmentType || 'ABSOLUTE_REDUCTION',
    priceAdjustmentValue: data?.priceAdjustmentValue ?? 0,
    showInHighlights: data?.showInHighlights ?? false,
    showDiscountTag: data?.showDiscountTag ?? false,
    isExclusive: data?.isExclusive ?? false,
    couponCode: data?.couponCode || '',
    companyId: data?.companyId || '',
    availableHousingUnitTypes: [],
    validServices: [],
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
