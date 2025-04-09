import {
    ReservationFull,
    ReservationResponseFullDTOSaleChannel,
    ReservationResponseFullDTOStatus,
    User,
    useSearchHousingUnitTypes,
    useSearchReservationOption,
} from '@booksuite/sdk'
import * as yup from 'yup'

export const useCompanyHousingUnitTypes = (
    companyId: string | undefined,
    open: boolean,
) => {
    return useSearchHousingUnitTypes(
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

export const useCompanyReservationOptions = (
    companyId: string | undefined,
    startDate: string,
    endDate: string,
) => {
    return useSearchReservationOption(
        { companyId },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            filter: {
                published: true,
                billingType: 'DAILY',
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

export type ReservationServiceFormItem = {
    serviceId: string
    qtd: number
    totalPrice: number
}

export type ReservationFormData = {
    status: ReservationResponseFullDTOStatus
    saleChannel: ReservationResponseFullDTOSaleChannel
    startDate: string
    endDate: string
    totalDays: number | null
    adults: number | null
    children: number | null
    notes: string
    housingUnitId: string
    services: ReservationServiceFormItem[]
    guestUser: User | null
    sellerUser: User | null
    reservationOptions: string[]
}

export const transformReservationFormDataForSubmit = (
    formData: ReservationFormData,
): Omit<ReservationFormData, 'housingUnitId'> & {
    housingUnitId: string
    services: {
        serviceId: string
        qtd: number
        totalPrice: number
    }[]
} => {
    const { services, ...rest } = formData

    return {
        ...rest,
        services: services.map((service) => ({
            serviceId: service.serviceId,
            qtd: service.qtd,
            totalPrice: service.totalPrice,
        })),
    }
}

export const createReservationFormInitialValues = (
    data?: ReservationFull,
): ReservationFormData => ({
    status: data?.status || 'WAITING_PAYMENT',
    saleChannel: data?.saleChannel || 'RECEPTION',
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
    totalDays: data?.totalDays ?? null,
    adults: data?.adults ?? null,
    children: data?.children ?? null,
    notes: data?.notes || '',
    housingUnitId: data?.housingUnit?.id || '',
    services:
        data?.services?.map((s) => ({
            serviceId: s.service.id,
            qtd: s.qtd,
            totalPrice: s.totalPrice,
        })) || [],
    guestUser: data?.guestUser || null,
    sellerUser: data?.sellerUser || null,
    reservationOptions: [],
})

export const reservationFormSchema = yup.object({
    status: yup.string().required('Status é obrigatório'),
    saleChannel: yup.string().required('Canal de venda é obrigatório'),
    startDate: yup.string().required('Data de início é obrigatória'),
    endDate: yup.string().required('Data de término é obrigatória'),
    totalDays: yup.number().nullable(),
    adults: yup.number().nullable(),
    children: yup.number().nullable(),
    notes: yup.string().optional(),
    housingUnitId: yup.string().required('Unidade habitacional é obrigatória'),
    services: yup
        .array()
        .of(
            yup.object().shape({
                serviceId: yup.string().required('Serviço é obrigatório'),
                qtd: yup.number().min(1, 'Quantidade deve ser pelo menos 1'),
                totalPrice: yup
                    .number()
                    .min(0, 'Preço total deve ser maior ou igual a 0'),
            }),
        )
        .min(0),
    guestUser: yup
        .object()
        .shape({
            email: yup.string().email().required(),
            firstName: yup.string().required(),
            lastName: yup.string().nullable(),
            phone: yup.string().nullable(),
            password: yup.string().required(),
            metaData: yup.object().nullable(),
        })
        .nullable(),
    sellerUser: yup
        .object()
        .shape({
            email: yup.string().email().required(),
            firstName: yup.string().required(),
            lastName: yup.string().nullable(),
            phone: yup.string().nullable(),
            password: yup.string().required(),
            metaData: yup.object().nullable(),
        })
        .nullable(),
    reservationOptions: yup.array().of(yup.string()).min(0),
})
