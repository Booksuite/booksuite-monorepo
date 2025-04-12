import { CompanyFacility } from '@booksuite/sdk'
import * as yup from 'yup'

export type ExistingFacilityData = {
    facilityId: string
    isFeatured: boolean
    isNew?: false
}

export type FacilityInput = ExistingFacilityData

export type FacilitiesFormData = {
    facilities: FacilityInput[]
}

export const createFacilitiesInitialValues = (
    data: { facilities?: CompanyFacility[] } | undefined,
): FacilitiesFormData => ({
    facilities:
        data?.facilities?.map((f) => ({
            facilityId: f.facility.id,
            isFeatured: f.order === 0,
        })) || [],
})

export const facilitiesFormSchema = yup.object({
    facilities: yup.array().of(
        yup.lazy((value) => {
            if (value.isNew) {
                return yup.object().shape({
                    name: yup.string().required('Nome é obrigatório'),
                    category: yup.string().required('Categoria é obrigatória'),
                    isNew: yup.boolean().required(),
                    isFeatured: yup.boolean().required(),
                })
            }
            return yup.object().shape({
                facilityId: yup
                    .string()
                    .required('ID da comodidade é obrigatório'),
                isFeatured: yup.boolean().required(),
            })
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
