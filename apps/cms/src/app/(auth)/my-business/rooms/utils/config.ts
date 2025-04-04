import {
    HousingUnitTypeCreateInput,
    HousingUnitTypeFull,
    HousingUnitTypeMedia,
    HousingUnitTypeMediaInput,
} from '@booksuite/sdk'
import * as yup from 'yup'

import { normalizeHousingUnitTypeFacilityInput } from './normalizeFn'

export type RoomsFormData = Omit<HousingUnitTypeCreateInput, 'medias'> & {
    medias: HousingUnitTypeMedia[]
}

export const transformFormDataForSubmit = (
    formData: RoomsFormData,
): HousingUnitTypeCreateInput => {
    const { medias, ...rest } = formData

    const transformedMedias: HousingUnitTypeMediaInput[] = medias.map(
        (media) => ({
            mediaId: media.media.id,
            isFeatured: media.isFeatured,
            order: media.order ?? undefined,
        }),
    )

    return {
        ...rest,
        medias: transformedMedias,
    }
}

export const createFormInitialValues = (
    data?: HousingUnitTypeFull,
): RoomsFormData => ({
    name: data?.name || '',
    published: false,
    slug: data?.slug || '',
    shortDescription: data?.shortDescription || '',
    description: data?.description || '',
    order: data?.order || 0,
    weekdaysPrice: data?.weekdaysPrice || 0,
    weekendPrice: data?.weekendPrice || 0,
    maxAdults: data?.maxAdults || 1,
    maxChildren: data?.maxChildren || 0,
    minGuests: data?.minGuests || 1,
    maxGuests: data?.maxGuests || 1,
    extraAdultPrice: data?.extraAdultPrice || 0,
    chargeExtraAdultHigherThan: data?.chargeExtraAdultHigherThan || 1,
    housingUnits: data?.housingUnits || [],
    facilities: normalizeHousingUnitTypeFacilityInput(data?.facilities || []),
    medias: data?.medias || [],
})

export const roomsFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    published: yup.boolean().required('Status é obrigatório'),
    slug: yup.string().required('Slug é obrigatório'),
    description: yup.string().required('Descrição é obrigatório'),
    order: yup.number().required('Ordem é obrigatório'),
    minGuests: yup.number().optional(),
    maxGuests: yup.number().optional(),
    maxAdults: yup.number().optional(),
    maxChildren: yup.number().optional(),
    weekdaysPrice: yup.number().required('Preço da semana é obrigatório'),
    weekendPrice: yup.number().required('Preço do fim de semana é obrigatório'),
    extraAdultPrice: yup
        .number()
        .required('Preço do adulto adicional é obrigatório'),
    chargeExtraAdultHigherThan: yup
        .number()
        .required('Mínimo de adultos para cobrar adicional é obrigatório'),
    housingUnits: yup.array().of(
        yup.object({
            name: yup.string().required('Nome da unidade é obrigatório'),
        }),
    ),
    facilities: yup.array().of(
        yup.object({
            isFeatured: yup.boolean().optional(),
            facilityId: yup.string().required('Comodidade é obrigatório'),
        }),
    ),
    medias: yup.array().min(1, 'Mídia é obrigatório'),
})
