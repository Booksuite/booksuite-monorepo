import {
    ServiceCreateInput,
    ServiceFull,
    ServiceHousingUnitTypeInput,
    ServiceMedia,
    ServiceMediaInput,
} from '@booksuite/sdk'
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

    return {
        ...rest,
        coverMediaId: medias[0]?.media.id,
        medias: transformedMedias,
        availableWeekDays: formData.availableWeekDays.map(Number),
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
    adults: data?.adults || 0,
    billingType: data?.billingType || 'DAILY',
    availableWeekDays: data?.availableWeekDays.map(String) || [],
    medias: data?.medias || [],
    description: data?.name || '',
    minDaily: data?.minDaily || 1,
    minNotice: data?.minNotice || 1,
    included: data?.included || '',
    notes: data?.notes || '',
    onlineSale: data?.onlineSale || false,
    panelSale: data?.panelSale || false,
    seasonalSale: data?.seasonalSale || false,
    price: data?.price || 0,
    seasonEnd: data?.seasonEnd || '',
    seasonStart: data?.seasonStart || '',
    coverMediaId: data?.coverMedia?.id || '',
    availableHousingUnitTypes:
        data?.availableHousingUnitTypes?.map((h) => ({
            housingUnitTypeId: h.housingUnitType.id,
        })) || [],
})

export const serviceFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    published: yup.boolean().required('Status é obrigatório'),
    adults: yup.number().min(0),
    billingType: yup.string().required('Tipo de cobrança é obrigatório'),
    availableHousingUnitTypes: yup.array().min(1),
    medias: yup.array().min(1),
    description: yup.string().required('Descrição é obrigatória'),
    minDaily: yup
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
    seasonStart: yup.string().optional(),
    seasonEnd: yup.string().optional(),
    coverMediaId: yup.string().optional(),
})
