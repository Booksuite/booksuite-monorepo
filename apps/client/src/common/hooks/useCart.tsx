'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface HousingUnit {
    id: string
    name: string
    price: number
    image: string
    checkIn: Date
    checkOut: Date
    guests: number
    mealPlan?: string
    housingUnitTypeId: string
}

export interface CartService {
    id: string
    name: string
    price: number
    image: string
    quantity: number
    description?: string
    originalPrice?: number
    discount?: number
    availableHousingUnitTypeIds?: string[]
    minDaily?: number
    minNotice?: number
    availableWeekDays?: number[]
}

interface CartState {
    housingUnits: HousingUnit[]
    services: CartService[]
    addToCart: (item: HousingUnit | CartService) => void
    removeFromCart: (itemId: string) => void
    isInCart: (itemId: string) => boolean
    getTotal: () => number
    getServiceIncompatibilityReason: (
        service: CartService,
        housingUnit: HousingUnit,
    ) => string | null
}

const getDaysDifference = (checkIn: Date, checkOut: Date) => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            housingUnits: [],
            services: [],
            addToCart: (item: HousingUnit | CartService) => {
                if ('checkIn' in item) {
                    set((state) => ({
                        housingUnits: [
                            ...state.housingUnits,
                            {
                                ...item,
                                checkIn: new Date(item.checkIn),
                                checkOut: new Date(item.checkOut),
                            },
                        ],
                    }))
                } else {
                    set((state) => {
                        const existingIndex = state.services.findIndex(
                            (s) => s.id === item.id,
                        )
                        if (existingIndex >= 0) {
                            const newServices = [...state.services]
                            newServices[existingIndex] = item
                            return { services: newServices }
                        }
                        return { services: [...state.services, item] }
                    })
                }
            },
            removeFromCart: (itemId: string) => {
                set((state) => ({
                    housingUnits: state.housingUnits.filter(
                        (item) => item.id !== itemId,
                    ),
                    services: state.services.filter(
                        (item) => item.id !== itemId,
                    ),
                }))
            },
            isInCart: (itemId: string) => {
                const state = get()
                return (
                    state.housingUnits.some((item) => item.id === itemId) ||
                    state.services.some((item) => item.id === itemId)
                )
            },
            getTotal: () => {
                const state = get()
                return [
                    ...state.housingUnits.map((item) => item.price),
                    ...state.services.map((item) => item.price * item.quantity),
                ].reduce((acc, price) => acc + price, 0)
            },
            getServiceIncompatibilityReason: (
                service: CartService,
                housingUnit: HousingUnit,
            ): string | null => {
                if (!service || !housingUnit) return null

                if (
                    Array.isArray(service.availableHousingUnitTypeIds) &&
                    service.availableHousingUnitTypeIds.length > 0 &&
                    !service.availableHousingUnitTypeIds.includes(
                        housingUnit.housingUnitTypeId,
                    )
                ) {
                    return 'Extra não disponível nesta acomodação.'
                }

                const days = getDaysDifference(
                    housingUnit.checkIn,
                    housingUnit.checkOut,
                )

                if (
                    typeof service.minDaily === 'number' &&
                    service.minDaily > 0 &&
                    days < service.minDaily
                ) {
                    return `Mínimo de ${service.minDaily} diárias para reservar este item.`
                }

                if (
                    Array.isArray(service.availableWeekDays) &&
                    service.availableWeekDays.length > 0
                ) {
                    let available = false
                    for (let d = 0; d < days; d++) {
                        const date = new Date(housingUnit.checkIn)
                        date.setDate(date.getDate() + d)
                        if (service.availableWeekDays.includes(date.getDay())) {
                            available = true
                            break
                        }
                    }
                    if (!available)
                        return 'Extra não disponível na data de estadia escolhida.'
                }

                return null
            },
        }),
        {
            name: 'shopping-cart',
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name)
                    if (!str) return null

                    try {
                        const data = JSON.parse(str)

                        if (data?.state?.housingUnits) {
                            data.state.housingUnits =
                                data.state.housingUnits.map(
                                    (unit: HousingUnit) => ({
                                        ...unit,
                                        checkIn: new Date(unit.checkIn),
                                        checkOut: new Date(unit.checkOut),
                                    }),
                                )
                        }

                        return data
                    } catch {
                        return null
                    }
                },
                setItem: (name, value) =>
                    localStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => localStorage.removeItem(name),
            },
            partialize: (state): CartState => ({
                ...state,
                housingUnits: state.housingUnits,
                services: state.services,
            }),
        },
    ),
)
