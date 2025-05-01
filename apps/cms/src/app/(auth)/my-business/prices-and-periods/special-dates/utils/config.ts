import {
    HousingUnitTypePricingChangeInput,
    PriceVariationType,
    SpecialDateFull,
    SpecialDateMedia,
} from '@booksuite/sdk'
import moment from 'moment'
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
    housingUnitTypePrices: HousingUnitTypePricingChangeInput[]
    services: string[]
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
    } = formData

    const startDate = moment.utc(formData.startDate).startOf('day')
    const endDate = moment.utc(formData.endDate).endOf('day')

    const transformedData = {
        name: formData.name,
        published: formData.published,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        minDaily: formData.minDaily,
        priceVariationType: formData.priceVariationType,
        price: formData.price,
        description: description || undefined,
        generalDescription: generalDescription || undefined,
        availableWeekDays: formData.availableWeekDays.map(Number),
        medias: medias.map((media) => ({
            mediaId: media.media.id,
            order: typeof media.order === 'number' ? media.order : undefined,
        })),
        housingUnitTypePrices: housingUnitTypePrices.map((item) => ({
            housingUnitTypeId: item.housingUnitTypeId,
            baseWeekPrice: item.baseWeekPrice,
            finalWeekPrice: item.finalWeekPrice,
            baseWeekendPrice: item.baseWeekendPrice,
            finalWeekendPrice: item.finalWeekendPrice,
        })),
        includedServices: services.map((serviceId) => ({
            serviceId,
        })),
    }

    return transformedData
}

export const createSpecialDateFormInitialValues = (
    data?: SpecialDateFull,
): SpecialDateFormData => ({
    id: data?.id || '',
    name: data?.name || '',
    published: data?.published || false,
    startDate: data?.startDate.split('T').at(0) || '',
    endDate: data?.endDate.split('T').at(0) || '',
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
        .of(
            yup.object({
                housingUnitTypeId: yup
                    .string()
                    .uuid('ID do tipo de unidade deve ser um UUID válido')
                    .required('ID do tipo de unidade é obrigatório'),
                baseWeekPrice: yup
                    .number()
                    .required('Preço base da semana é obrigatório'),
                finalWeekPrice: yup
                    .number()
                    .required('Preço final da semana é obrigatório'),
                baseWeekendPrice: yup
                    .number()
                    .required('Preço base do fim de semana é obrigatório'),
                finalWeekendPrice: yup
                    .number()
                    .required('Preço final do fim de semana é obrigatório'),
            }),
        )
        .min(
            1,
            'É necessário definir ao menos um tipo de unidade habitacional',
        ),
    services: yup.array(),
    description: yup.string().optional(),
    generalDescription: yup.string().optional(),
})
