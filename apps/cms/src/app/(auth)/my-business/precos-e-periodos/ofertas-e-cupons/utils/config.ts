import * as yup from 'yup'

export type offerCouponsData = {
    name: string
    description?: string
    startDate: string
    endData: string
    minDaily: string
    maxDaily: string
    minNotice?: string
    maxNotice?: string
    validCancelledReservation: boolean
    validPackagesAndHolidays: boolean
    housingUnitTypes: []
    pix: boolean
    onHotel: boolean
    creditCard: boolean
    nights: []
    validServiceAndPackages: boolean
    priceVariationsType: string
    priceVariationValue: number
    showOnFeatures: boolean
    showDiscountTag: boolean
    offerCupom: boolean
}
export const createFormInitialValues = (
    data?: offerCouponsData,
): offerCouponsData => ({
    name: data?.name || '',
    description: data?.description || '',
    startDate: data?.startDate || '',
    endData: data?.endData || '',
    minDaily: data?.minDaily || '',
    maxDaily: data?.maxDaily || '',
    minNotice: data?.minNotice || '',
    maxNotice: data?.maxNotice || '',
    validCancelledReservation: data?.validCancelledReservation || false,
    validPackagesAndHolidays: data?.validPackagesAndHolidays || false,
    housingUnitTypes: data?.housingUnitTypes || [],
    pix: data?.pix || false,
    onHotel: data?.onHotel || false,
    creditCard: data?.creditCard || false,
    nights: data?.nights || [],
    validServiceAndPackages: data?.validServiceAndPackages || false,
    priceVariationsType: data?.priceVariationsType || '',
    priceVariationValue: data?.priceVariationValue || 0,
    showOnFeatures: data?.showOnFeatures || false,
    showDiscountTag: data?.showDiscountTag || false,
    offerCupom: data?.offerCupom || false,
})

export const offerCouponsFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    description: yup.string().required('Descrição é obrigatória'),
    startDate: yup.string().required('Data de início é obrigatória'),
    endData: yup.string().required('Data de término é obrigatória'),
    minDaily: yup.string().required('Mínimo de diárias é obrigatório'),
    maxDaily: yup.string().required('Máximo de diárias é obrigatório'),
    minNotice: yup.string().optional(),
    maxNotice: yup.string().optional(),
    validCancelledReservation: yup.boolean().required('Campo obrigatório'),
    validPackagesAndHolidays: yup.boolean().required('Campo obrigatório'),
    housingUnitTypes: yup
        .array()
        .of(
            yup.object({
                id: yup
                    .string()
                    .required('ID da unidade habitacional é obrigatório'),
                name: yup
                    .string()
                    .required('Nome da unidade habitacional é obrigatório'),
            }),
        )
        .optional(),
    pix: yup.boolean().required('Campo obrigatório'),
    onHotel: yup.boolean().required('Campo obrigatório'),
    creditCard: yup.boolean().required('Campo obrigatório'),
    nights: yup
        .array()
        .of(yup.number().min(1, 'Noite deve ser pelo menos 1'))
        .optional(),
    validServiceAndPackages: yup.boolean().required('Campo obrigatório'),
    priceVariationsType: yup
        .string()
        .required('Tipo de variação de preço é obrigatório'),
    priceVariationValue: yup
        .number()
        .min(0, 'Valor da variação de preço deve ser positivo')
        .required('Valor da variação de preço é obrigatório'),
    showOnFeatures: yup.boolean().required('Campo obrigatório'),
    showDiscountTag: yup.boolean().required('Campo obrigatório'),
    offerCupom: yup.boolean().required('Campo obrigatório'),
})
