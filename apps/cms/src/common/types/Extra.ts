export type UpdateExtraDTO = Partial<
    Omit<Extra, 'id' | 'createdAt' | 'updatedAt'>
>

export type CreateExtraDTO = Omit<Extra, 'id' | 'createdAt' | 'updatedAt'>

export type Extra = {
    id: number
    name: string
    billType: string
    price: number
    adults: number
    minDaily: number
    minNotice: number
    onlineSale: boolean
    panelSale: boolean
    seasonalSale: boolean
    seasonStart: string
    seasonEnd: string
    hosting?: string
    nights?: Array<string>
    description: string
    included: string
    notes: string
    videoUrl: string
    createdAt: string
    updatedAt: string
}
