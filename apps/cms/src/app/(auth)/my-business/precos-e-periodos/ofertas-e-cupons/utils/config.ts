import * as yup from 'yup'

//Dados Temporários
type housingUnitType = {
    id: number
    name: string
}

type paymentMethod = {
    id: number
    name: string
}

const unit1: housingUnitType = {
    id: 1,
    name: 'Deluxe Suite',
}

const unit2: housingUnitType = {
    id: 2,
    name: 'Chalé Diamante',
}

type offerCouponsData = {
    id: string
    name: string
    description?: string
    startDate: string
    endDate: string
    minDaily: number
    maxDaily: number
    minNotice?: number
    maxNotice?: number
    validCancelledReservation: boolean
    validPackagesAndHolidays: boolean
    housingUnitTypes: housingUnitType[]
    paymentMethods: paymentMethod[]
    nights: string[]
    validServiceAndPackages: boolean
    priceVariationsType: string
    priceVariationValue: number
    showOnFeatures: boolean
    showDiscountTag: boolean
    coupon: boolean
    couponCode: string
}

export type OfferCouponsFormData = offerCouponsData

export const createFormInitialValues = (
    data?: offerCouponsData,
): offerCouponsData => ({
    id: data?.id || '',
    name: data?.name || '',
    description: data?.description || '',
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
    minDaily: data?.minDaily || 0,
    maxDaily: data?.maxDaily || 0,
    minNotice: data?.minNotice || 0,
    maxNotice: data?.maxNotice || 0,
    validCancelledReservation: data?.validCancelledReservation || false,
    validPackagesAndHolidays: data?.validPackagesAndHolidays || false,
    housingUnitTypes: data?.housingUnitTypes || [unit1, unit2],
    paymentMethods: data?.paymentMethods || [],
    nights: data?.nights || [],
    validServiceAndPackages: data?.validServiceAndPackages || false,
    priceVariationsType: data?.priceVariationsType || '',
    priceVariationValue: data?.priceVariationValue || 0,
    showOnFeatures: data?.showOnFeatures || false,
    showDiscountTag: data?.showDiscountTag || false,
    coupon: data?.coupon || false,
    couponCode: data?.couponCode || '',
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
    paymentMethods: yup
        .object()
        .shape({ id: yup.number(), name: yup.string() })
        .required('´Métodos de Pagamento Obrigatório'),
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
    coupon: yup.boolean().required('Campo obrigatório'),
    couponCode: yup.string(),
})

//Dados temporarios
export const offerCouponsPaginated = {
    items: [
        {
            id: '0',
            name: 'Promoção de Verão',
            description: 'Desconto de 20% para reservas no verão!',
            startDate: '01/06/2025',
            endDate: '31/08/2025',
            minDaily: 2,
            maxDaily: 7,
            minNotice: 3,
            maxNotice: 30,
            validCancelledReservation: true,
            validPackagesAndHolidays: false,
            housingUnitTypes: [],
            pix: true,
            onHotel: false,
            creditCard: true,
            nights: [],
            paymentMethods: [],
            validServiceAndPackages: true,
            priceVariationsType: 'percentual',
            priceVariationValue: 20,
            showOnFeatures: true,
            showDiscountTag: true,
            coupon: true,
            couponCode: 'RAMOM10',
        },
        {
            id: '1',
            name: 'Desconto de Inverno',
            description: 'Ganhe 15% de desconto em pacotes para feriados!',
            startDate: '15/04/2025',
            endDate: '21/04/2025',
            minDaily: 3,
            maxDaily: 10,
            minNotice: 5,
            maxNotice: 60,
            validCancelledReservation: false,
            validPackagesAndHolidays: true,
            housingUnitTypes: [],
            pix: true,
            onHotel: true,
            creditCard: false,
            nights: [],
            paymentMethods: [],
            validServiceAndPackages: true,
            priceVariationsType: 'fixo',
            priceVariationValue: 100,
            showOnFeatures: false,
            showDiscountTag: true,
            coupon: true,
            couponCode: 'RAMOM10',
        },
    ],
    totalItems: 2,
    totalPages: 1,
    currentPage: 1,
    prevPage: null,
    nextPage: null,
}
