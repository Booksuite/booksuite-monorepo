import {
    ReservationCreateInput,
    ReservationFull,
    useSearchRateOption,
    useSearchServices,
} from '@booksuite/sdk'
import * as yup from 'yup'

export const useCompanyRateOption = (
    companyId: string,
    startDate: string,
    endDate: string,
) => {
    return useSearchRateOption(
        { companyId },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            filter: {
                published: true,
            },
        },
        undefined,
        {
            query: {
                enabled: !!(companyId && startDate && endDate),
            },
        },
    )
}

export const useCompanyServices = (companyId: string, open: boolean) => {
    return useSearchServices(
        { companyId },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            filter: { published: true },
        },
        undefined,
        {
            query: {
                enabled: !!companyId && open,
            },
        },
    )
}

export type ReservationServiceFormItem = {
    serviceId: string
    qtd: number
    totalPrice: number
}

export type ReservationFormData = ReservationCreateInput & {
    summary: {
        rateOption: {
            price: number
            adults: number
            nights: number
            children: number
        }

        dailyTotal: number
        additionalTotal: number
        discounts: number
        refound: number
        addition: number
        tax: number
        finalPrice: number
        totalReceived: number
    }
}

// export const transformReservationFormDataForSubmit = (
//     formData: ReservationFormData,
// ): Omit<ReservationFormData, 'housingUnitId'> & {
//     housingUnitId: string
//     services: {
//         serviceId: string
//         qtd: number
//         totalPrice: number
//     }[]
// } => {
//     const { services, ...rest } = formData

//     return {
//         ...rest,
//         services: services.map((service) => ({
//             serviceId: service.serviceId,
//             qtd: service.quantity,
//             totalPrice: service.totalPrice,
//         })),
//     }
// }

export const createReservationFormInitialValues = (
    data?: ReservationFull,
): ReservationFormData => ({
    status: data?.status || 'WAITING_PAYMENT',
    saleChannel: data?.saleChannel || 'RECEPTION',
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
    totalDays: data?.totalDays ?? 0,
    adults: data?.adults ?? 0,
    ageGroups: data?.ageGroups || [],
    finalPrice: data?.finalPrice || 0,
    notes: data?.notes || '',
    housingUnitId: data?.housingUnit?.id || '',
    services:
        data?.services?.map((s) => ({
            serviceId: s.id,
            quantity: s.quantity || 0,
            totalPrice: s.totalPrice || 0,
        })) || [],
    guestUser: {
        email: '',
        firstName: '',
        password: '',
        lastName: '',
        metaData: {},
        phone: '',
    },
    sellerUserId: 'b79d6ce7-8766-478c-a752-9770d200256d',
    rateOptionId: '',
    summary: {
        rateOption: {
            adults: 0,
            children: 0,
            nights: 0,
            price: 0,
        },
        addition: 0,
        additionalTotal: 0,
        dailyTotal: 0,
        discounts: 0,
        finalPrice: 0,
        refound: 0,
        tax: 0,
        totalReceived: 0,
    },
})

export const reservationFormSchema = yup.object({
    status: yup.string().required('Status é obrigatório'),
    saleChannel: yup.string().required('Canal de venda é obrigatório'),
    startDate: yup.string().required('Data de início é obrigatória'),
    endDate: yup.string().required('Data de término é obrigatória'),
    totalDays: yup.number().nullable(),
    adults: yup.number().nullable(),
    children: yup.array(),
    notes: yup.string().optional(),
    housingUnitId: yup.string().required('Unidade habitacional é obrigatória'),
    services: yup.array().min(0),
    guestUser: yup.object().nullable(),
    sellerUser: yup
        .object()

        .nullable(),
    reservationOptions: yup.array().min(0),
})
