import {
    HousingUnit,
    HousingUnitType,
    RateOptionFull,
    ReservationAgeGroupInput,
    ReservationCreateInput,
    ReservationFull,
    ReservationService,
} from '@booksuite/sdk'
import { omit } from 'radash'
import * as yup from 'yup'

export type ReservationServiceFormItem = {
    serviceId: string
    qtd: number
    totalPrice: number
}

export type ReservationFormData = Omit<
    ReservationCreateInput,
    'ageGroups' | 'services'
> & {
    ageGroups: Record<string, number>
    rateOption: RateOptionFull | null
    housingUnitType: HousingUnitType | null
    availableHousingUnits: HousingUnit[]
    housingUnit: HousingUnit | null
    services: ReservationService[]
    createdAt: string
    updatedAt: string
}

export const transformAgeGroupObjToArray = (
    ageGroups: Record<string, number>,
): ReservationAgeGroupInput[] => {
    return Object.entries(ageGroups).reduce<ReservationAgeGroupInput[]>(
        (acc, [ageGroupId, quantity]) => {
            if (quantity > 0) {
                acc.push({
                    ageGroupId,
                    quantity,
                })
            }
            return acc
        },
        [],
    )
}
export const transformAgeGroupArrayToObj = (
    ageGroups: ReservationAgeGroupInput[],
): Record<string, number> => {
    return ageGroups.reduce<Record<string, number>>(
        (acc, { ageGroupId, quantity }) => {
            if (quantity > 0) {
                acc[ageGroupId] = quantity
            }
            return acc
        },
        {},
    )
}

export const normalizeReservationFormData = (
    data: ReservationFormData,
): ReservationCreateInput => {
    return {
        ...omit(data, ['availableHousingUnits']),
        ageGroups: transformAgeGroupObjToArray(data.ageGroups),
        housingUnitTypeId: data.housingUnitType?.id || '',
        rateOptionId: data.rateOption?.id || '',
        services: data.services.map((s) => ({
            serviceId: s.service.id,
            quantity: s.quantity,
            totalPrice: s.totalPrice,
        })),
    }
}

export const createReservationFormInitialValues = (
    data?: ReservationFull,
): ReservationFormData => ({
    ...data,
    basePrice: data?.basePrice || 0,
    servicesPrice: data?.servicesPrice || 0,
    childrenPrice: data?.childrenPrice || 0,
    rateOptionPrice: data?.rateOptionPrice || 0,
    finalPrice: data?.finalPrice || 0,

    status: data?.status || 'WAITING_PAYMENT',
    saleChannel: data?.saleChannel || 'RECEPTION',
    startDate: data?.startDate || '2025-05-19',
    endDate: data?.endDate || '2025-05-21',

    adults: data?.adults ?? 2,
    ageGroups: data?.ageGroups
        ? transformAgeGroupArrayToObj(data.ageGroups)
        : {},
    notes: data?.notes || '',
    services:
        data?.services?.map<ReservationService>((s) => ({
            id: s.id,
            serviceId: s.service.id,
            quantity: s.quantity || 0,
            totalPrice: s.totalPrice || 0,
            service: s.service,
        })) || [],
    guestUser: data?.guestUser
        ? {
              email: data.guestUser.email || '',
              firstName: data.guestUser.firstName || '',
              lastName: data.guestUser.lastName || '',
              password: '', // never pre-populate password
              metaData: data.guestUser.metaData || {},
              phone: data.guestUser.phone || '',
          }
        : {
              email: '',
              firstName: '',
              password: '',
              lastName: '',
              metaData: {},
              phone: '',
          },

    housingUnit: data?.housingUnit || null,
    availableHousingUnits: [],
    rateOption: data?.rateOption || null,
    rateOptionId: data?.rateOptionId || data?.rateOption?.id || '',
    housingUnitType: data?.housingUnitType || null,
    housingUnitTypeId: data?.housingUnitTypeId || '',
    sellerUserId: data?.sellerUserId || '',
    housingUnitId: data?.housingUnit?.id || '',
    createdAt: data?.createdAt || '',
    updatedAt: data?.updatedAt || '',
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
    sellerUser: yup.object().nullable(),
    reservationOptions: yup.array().min(0),
})
