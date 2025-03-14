import { CategoryDTO } from '@/common/dto/categoryDTO'

import type { Status } from './Status'

export type UpdateServiceDTO = Partial<Omit<Service, 'id'>>

export type CreateServiceDTO = Omit<Service, 'id'>

export type Service = {
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
