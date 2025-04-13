import {
    PriceVariationType,
    SpecialDateFull,
    SpecialDateHousingUnitType,
    SpecialDateMedia,
} from '@booksuite/sdk'
import * as yup from 'yup'

interface LocalizedText {
    pt_BR: string
}

export type SpecialDateFormData = Omit<
    SpecialDateFull,
    | 'medias'
    | 'housingUnitTypePrices'
    | 'includedServices'
    | 'availableWeekDays'
    | 'description'
    | 'generalDescription'
> & {
    medias: SpecialDateMedia[]
    housingUnitTypePrices: SpecialDateHousingUnitType[]
    services: string[]
    servicesData: Array<{ id: string; name: string }>
    availableWeekDays: string[]
    description?: string
    generalDescription?: string
}

export const transformSpecialDateFormDataForSubmit = (
    formData: SpecialDateFormData,
) => {
    const {
        medias,
        housingUnitTypePrices,
        services,
        description,
        generalDescription,
        ...rest
    } = formData

    return {
        ...rest,
        medias: medias.map((media) => ({
            mediaId: media.media.id,
            id: media.id,
            order: media.order ?? null,
        })),
        housingUnitTypePrices: housingUnitTypePrices.map((unit) => ({
            housingUnitTypeId: unit.housingUnitType.id,
            baseWeekPrice: unit.baseWeekPrice,
            newWeekPrice: unit.newWeekPrice,
            weekendBasePrice: unit.weekendBasePrice,
            weekendNewPrice: unit.weekendNewPrice,
        })),
        includedServices: services.map((serviceId) => ({
            serviceId,
        })),
        availableWeekDays: formData.availableWeekDays.map(Number),
        description: description || null,
        generalDescription: generalDescription || null,
    }
}

export const createSpecialDateFormInitialValues = (
    data?: SpecialDateFull,
): SpecialDateFormData => ({
    id: data?.id || '',
    name: data?.name || '',
    published: data?.published || false,
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
    minDaily: data?.minDaily || 1,
    priceVariationType: data?.priceVariationType || 'ABSOLUTE_INCREASE',
    price: data?.price || 0,
    availableWeekDays: Array.isArray(data?.availableWeekDays)
        ? data.availableWeekDays.map(String)
        : [],
    description: (data?.description as LocalizedText)?.pt_BR || '',
    generalDescription:
        (data?.generalDescription as LocalizedText)?.pt_BR || '',
    medias: data?.medias || [],
    housingUnitTypePrices: data?.housingUnitTypePrices || [],
    services: data?.includedServices?.map((s) => s.service.id) || [],
    servicesData:
        data?.includedServices?.map((s) => ({
            id: s.service.id,
            name: s.service.name,
        })) || [],
})

export const specialDateFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    published: yup.boolean().required('Status é obrigatório'),
    startDate: yup.string().required('Data de início é obrigatória'),
    endDate: yup.string().required('Data de fim é obrigatória'),
    minDaily: yup
        .number()
        .min(1, 'Mínimo de diárias deve ser pelo menos 1')
        .required('Mínimo de diárias é obrigatório'),
    availableWeekDays: yup
        .array()
        .of(yup.string())
        .required('Dias da semana são obrigatórios'),
    priceVariationType: yup
        .mixed<PriceVariationType>()
        .oneOf([
            'ABSOLUTE_INCREASE',
            'ABSOLUTE_REDUCTION',
            'PERCENTAGE_INCREASE',
            'PERCENTAGE_REDUCTION',
            'CUSTOM',
        ])
        .required('Tipo de variação de preço é obrigatório'),
    price: yup.number().min(0).required('Preço é obrigatório'),
    medias: yup.array().min(1, 'Pelo menos uma mídia é obrigatória'),
    housingUnitTypePrices: yup
        .array()
        .min(
            1,
            'É necessário definir ao menos um tipo de unidade habitacional',
        ),
    services: yup.array(),
    description: yup.string().optional(),
    generalDescription: yup.string().optional(),
})
