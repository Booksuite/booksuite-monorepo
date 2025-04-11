import { HousingUnitTypeFacilityInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type FacilitiesFormData = {
    facilities: HousingUnitTypeFacilityInput[]
}

export const createFacilitiesInitialValues = (
    data: Partial<FacilitiesFormData> | undefined,
): FacilitiesFormData => ({
    facilities:
        data?.facilities?.map((f: HousingUnitTypeFacilityInput) => ({
            facilityId: f.id,
            isFeatured: f.isFeatured || false,
        })) || [],
})

export const facilitiesFormSchema = yup.object({
    facilities: yup.array().of(
        yup.object().shape({
            facilityId: yup.string().required('ID da comodidade é obrigatório'),
            isFeatured: yup.boolean().required(),
        }),
    ),
})

export const MAX_FEATURED_FACILITIES = 5

export const COMODITIES_TAB_FILTER = [
    { label: 'Todas', value: 'ALL' },
    { label: 'Geral', value: 'GENERAL' },
    { label: 'Alimentos e Bebidas', value: 'FOOD_AND_BEVERAGES' },
    { label: 'Áreas de Lazer', value: 'LEISURE_AREAS' },
    { label: 'Atividades', value: 'ACTIVITIES' },
    { label: 'Estrutura', value: 'STRUCTURE' },
    { label: 'Idiomas Falados', value: 'LANGUAGES_SPOKEN' },
    { label: 'Internet', value: 'INTERNET' },
    { label: 'Serviços', value: 'SERVICES' },
    { label: 'Tipos de Cama', value: 'BED_TYPES' },
]
