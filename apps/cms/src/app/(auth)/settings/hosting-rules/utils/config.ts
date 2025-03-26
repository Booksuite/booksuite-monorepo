import { HostingRulesInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type HostingRulesData = HostingRulesInput

export const createHostingRulesInitialValues = (
    data?: HostingRulesInput | null,
): HostingRulesData => ({
    availableWeekDays: data?.availableWeekDays || [],
    availableWeekend: data?.availableWeekend || [],
    checkIn: data?.checkIn || 0,
    checkOut: data?.checkOut || 0,
    hostingOnSpecificDays: data?.hostingOnSpecificDays || false,
    minDaily: data?.minDaily || 0,
    seasonEnd: data?.seasonEnd || '',
    seasonStart: data?.seasonStart || '',
})

// export const hostingRulesDataSchema = yup.object({
//     name: yup.string().required('Nome é obrigatório'),
//     timezone: yup.string().required('Fuso horário é obrigatório'),
//     type: yup.string().required('Tipo é obrigatório'),

//     availableWeekDays: yup.array().of(yup.string()).required('Dias de semana disponíveis são obrigatórios'),
//     availableWeekend: yup.array().of(yup.string()).required('Fins de semana disponíveis são obrigatórios'),
    
//     checkIn: yup.number().min(0, 'Check-in deve ser maior ou igual a 0').required('Check-in é obrigatório'),
//     checkOut: yup.number().min(0, 'Check-out deve ser maior ou igual a 0').required('Check-out é obrigatório'),
    
//     hostingOnSpecificDays: yup.boolean().required('Definição de hospedagem em dias específicos é obrigatória'),
    
//     minDaily: yup.number().min(0, 'Mínimo de diárias deve ser maior ou igual a 0').required('Mínimo de diárias é obrigatório'),
    
//     seasonStart: yup.string().required('Data de início da temporada é obrigatória'),
//     seasonEnd: yup.string().required('Data de fim da temporada é obrigatória'),
// });
