import {
    ReservationAgeGroupInput,
    ReservationCreateInput,
    ReservationService,
    ReservationSummaryInput,
} from '@booksuite/sdk'
import * as yup from 'yup'

export type ReservationServiceFormItem = {
    serviceId: string
    qtd: number
    totalPrice: number
}

export type ReservationMainFormData = Pick<
    ReservationCreateInput,
    'startDate' | 'endDate' | 'adults'
> & {
    ageGroups: Record<string, number>
    summary: ReservationSummaryInput | null
}

export type ReservationFormData = Omit<
    ReservationCreateInput,
    | 'ageGroups'
    | 'services'
    | 'summary'
    | 'startDate'
    | 'endDate'
    | 'adults'
    | 'summary'
> &
    ReservationMainFormData & {
        services: ReservationService[]
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
    if (!data.summary) {
        throw new Error('Summary is required')
    }
    return {
        ...data,
        summary: data.summary,
        ageGroups: transformAgeGroupObjToArray(data.ageGroups),
        housingUnitTypeId: data.summary.housingUnitType.id || '',
        housingUnitId: data.summary.housingUnit?.id || '',
        rateOptionId: data.summary.summary.rateOption?.id || '',
        services: data.services.map((s) => ({
            serviceId: s.service.id,
            quantity: s.quantity,
            totalPrice: s.totalPrice,
        })),
        guestUserId: '22240a70-24fa-467f-8f0c-cb6bab891ec8',
        sellerUserId: '22240a70-24fa-467f-8f0c-cb6bab891ec8',
    }
}

export const createReservationFormInitialValues = (): ReservationFormData => ({
    summary: null,
    status: 'WAITING_PAYMENT',
    saleChannel: 'RECEPTION',
    startDate: '2025-05-19',
    endDate: '2025-05-21',
    adults: 2,
    ageGroups: {},
    notes: '',
    services: [],
    guestUserId: '',
    sellerUserId: '',
    rateOptionId: '',
    housingUnitId: '',
    housingUnitTypeId: '',
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
    summary: yup.object({
        housingUnit: yup.object().required('Acomodação é obrigatória'),
        housingUnitType: yup
            .object()
            .required('Tipo de acomodação é obrigatório'),
        summary: yup
            .object({
                rateOption: yup
                    .object()
                    .required('Opção de tarifa é obrigatória'),
            })
            .required('Resumo é obrigatório'),
    }),
})
