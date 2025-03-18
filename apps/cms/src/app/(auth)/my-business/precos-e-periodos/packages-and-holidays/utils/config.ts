import * as yup from 'yup'

export type PackagesAndHolidaysData = {
    id: string
    name: string
    description?: string
    startDate: string
    endDate: string
    minDaily: number
    maxDaily?: number
    minNotice?: number
    maxNotice?: number
    validCancelledReservation: boolean
    validPackagesAndHolidays: boolean
    housingUnitTypes?: { id: string; name: string }[]
    pix: boolean
    onHotel: boolean
    creditCard: boolean
    nights: number[]
    validServiceAndPackages: boolean
    priceVariationsType: string
    priceVariationValue: number
    showOnFeatures: boolean
    showDiscountTag: boolean
    offerCupom: boolean
    codeCupom?: string
}

export const packagesAndHolidaysFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    description: yup.string().required('Descrição é obrigatória'),
    startDate: yup.string().required('Data de início é obrigatória'),
    endDate: yup.string().required('Data de término é obrigatória'),
    minDaily: yup
        .number()
        .min(1, 'Mínimo de diárias deve ser pelo menos 1')
        .required('Mínimo de diárias é obrigatório'),
    maxDaily: yup.number().optional(),
    minNotice: yup.number().optional(),
    maxNotice: yup.number().optional(),
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
    codeCupom: yup.string().optional(),
})

export const mockPackagesAndHolidays = {
    items: [
        {
            id: '1',
            name: 'Promoção de Verão',
            description: 'Desconto de 20% para reservas no verão!',
            startDate: '2025-06-01',
            endDate: '2025-08-31',
            minDaily: 2,
            maxDaily: 7,
            minNotice: 3,
            maxNotice: 30,
            validCancelledReservation: true,
            validPackagesAndHolidays: false,
            housingUnitTypes: [{ id: '1', name: 'Chalé Diamante' }],
            pix: true,
            onHotel: false,
            creditCard: true,
            nights: [],
            validServiceAndPackages: true,
            priceVariationsType: 'percentual',
            priceVariationValue: 20,
            showOnFeatures: true,
            showDiscountTag: true,
            offerCupom: true,
            codeCupom: 'VERAO20',
        },
        {
            id: '2',
            name: 'Desconto de Inverno',
            description: 'Ganhe 15% de desconto em pacotes para feriados!',
            startDate: '2025-04-15',
            endDate: '2025-04-21',
            minDaily: 3,
            maxDaily: 10,
            minNotice: 5,
            maxNotice: 60,
            validCancelledReservation: false,
            validPackagesAndHolidays: true,
            housingUnitTypes: [{ id: '2', name: 'Suite Deluxe' }],
            pix: true,
            onHotel: true,
            creditCard: false,
            nights: [],
            validServiceAndPackages: true,
            priceVariationsType: 'fixo',
            priceVariationValue: 100,
            showOnFeatures: false,
            showDiscountTag: true,
            offerCupom: false,
        },
    ],
}
