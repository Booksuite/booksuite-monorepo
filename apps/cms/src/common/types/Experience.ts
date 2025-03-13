import { CategoryDTO } from '@/common/dto/categoryDTO'

import type { Status } from './Status'

export type UpdateExperienceDTO = Partial<Omit<Experience, 'id'>>

export type CreateExperienceDTO = Omit<Experience, 'id'>

export type Experience = {
    id: number
    name: string
    status?: Status
    minDaily: number
    minNotice: number
    onlineSale: boolean
    panelSale: boolean
    seasonalSale: boolean
    seasonSaleStart: string
    seasonSaleEnd: string
    seasonStart: string
    seasonEnd: string
    hosting?: string
    nights?: Array<string>
    description: string
    notes: string
    videoUrl?: string
    price: number
    priceAdjustment?: string
    discount: number
    billType: string
    category: CategoryDTO[]
}
