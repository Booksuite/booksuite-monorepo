import {
    ServiceCreateInput,
    ServiceFull,
    ServiceHousingUnitTypeInput,
    ServiceMedia,
    ServiceMediaInput,
} from '@booksuite/sdk'
import dayjs from 'dayjs'
import * as yup from 'yup'

export type ServiceFormData = Omit<
    ServiceCreateInput,
    'medias' | 'availableHousingUnitTypes' | 'availableWeekDays'
> & {
    medias: ServiceMedia[]
    availableHousingUnitTypes: ServiceHousingUnitTypeInput[]
    availableWeekDays: string[]
}

export const transformFormDataForSubmit = (
    formData: ServiceFormData,
): ServiceCreateInput => {
    const { medias, ...rest } = formData

    const transformedMedias: ServiceMediaInput[] = medias.map((media) => ({
        mediaId: media.media.id,
        order: media.order ?? null,
    }))

    const defaultStartDate = dayjs().startOf('day').toISOString()
    const defaultEndDate = dayjs().add(1, 'year').endOf('day').toISOString()

    return {
        ...rest,
        coverMediaId: medias[0]?.media.id,
        medias: transformedMedias,
        availableWeekDays: formData.availableWeekDays.map(Number),
        seasonStart:
            formData.seasonalSale && formData.seasonStart
                ? dayjs(formData.seasonStart).toISOString()
                : defaultStartDate,
        seasonEnd:
            formData.seasonalSale && formData.seasonEnd
                ? dayjs(formData.seasonEnd).toISOString()
                : defaultEndDate,
        availableHousingUnitTypes: formData.availableHousingUnitTypes.map(
            (item) => ({ housingUnitTypeId: item.housingUnitTypeId }),
        ),
    }
}

export const createFormInitialValues = (
    data?: ServiceFull,
): ServiceFormData => ({
    name: data?.name || '',
    published: false,
    billingType: data?.billingType || 'DAILY',
    availableWeekDays: Array.isArray(data?.availableWeekDays)
        ? data.availableWeekDays.map(String)
        : [],
    medias: data?.medias || [],
    description: data?.description || '',
    minStay: data?.minStay || 1,
    minNotice: data?.minNotice || 1,
    included: data?.included || '',
    notes: data?.notes || '',
    onlineSale: data?.onlineSale || false,
    panelSale: data?.panelSale || false,
    seasonalSale: data?.seasonalSale || false,
    price: data?.price || 0,
    seasonStart: data?.seasonStart?.split('T').at(0) || '',
    seasonEnd: data?.seasonEnd?.split('T').at(0) || '',
    coverMediaId: data?.coverMedia?.id || '',
    availableHousingUnitTypes:
        data?.availableHousingUnitTypes?.map((h) => ({
            housingUnitTypeId: h.housingUnitType.id,
        })) || [],
})

export const serviceFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    published: yup.boolean().required('Status é obrigatório'),
    billingType: yup.string().required('Tipo de cobrança é obrigatório'),
    availableHousingUnitTypes: yup.array().min(1),
    medias: yup.array().min(1),
    description: yup.string().required('Descrição é obrigatória'),
    minStay: yup
        .number()
        .min(1, 'Mínimo de diárias deve ser pelo menos 1')
        .required('Mínimo de diárias é obrigatório'),
    minNotice: yup
        .number()
        .min(1, 'Mínimo de aviso deve ser pelo menos 1')
        .required('Mínimo de aviso é obrigatório'),
    availableWeekDays: yup.array().required('Noites são obrigatórias'),
    included: yup.string().optional(),
    notes: yup.string().optional(),
    onlineSale: yup.boolean().required('Status da Venda online é obrigatória'),
    panelSale: yup
        .boolean()
        .required('Status da Venda no painel é obrigatória'),
    seasonalSale: yup
        .boolean()
        .required('Status da Venda sazonal é obrigatória'),
    price: yup.number().min(0).required('Preço é obrigatório'),
    seasonStart: yup.string().when('seasonalSale', {
        is: true,
        then: (schema) => schema.required('Data de início é obrigatória'),
        otherwise: (schema) => schema.optional(),
    }),
    seasonEnd: yup.string().when('seasonalSale', {
        is: true,
        then: (schema) => schema.required('Data de fim é obrigatória'),
        otherwise: (schema) => schema.optional(),
    }),
    coverMediaId: yup.string().optional(),
})
