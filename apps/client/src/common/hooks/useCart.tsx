'use client'

import { createContext, useCallback, useContext, useState } from 'react'

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

export interface Service {
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

interface CartContextData {
    housingUnits: HousingUnit[]
    services: Service[]
    addToCart: (item: HousingUnit | Service) => void
    removeFromCart: (itemId: string) => void
    isInCart: (itemId: string) => boolean
    total: number
    getServiceIncompatibilityReason: (
        service: Service,
        housingUnit: HousingUnit,
    ) => string | null
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [housingUnits, setHousingUnits] = useState<HousingUnit[]>([])
    const [services, setServices] = useState<Service[]>([])

    const addToCart = useCallback((item: HousingUnit | Service) => {
        if ('checkIn' in item) {
            setHousingUnits((state) => [...state, item as HousingUnit])
        } else {
            setServices((state) => {
                const existingServiceIndex = state.findIndex(
                    (s) => s.id === item.id,
                )
                if (existingServiceIndex >= 0) {
                    const newState = [...state]
                    newState[existingServiceIndex] = item as Service
                    return newState
                }
                return [...state, item as Service]
            })
        }
    }, [])

    const removeFromCart = useCallback((itemId: string) => {
        setHousingUnits((state) => state.filter((item) => item.id !== itemId))
        setServices((state) => state.filter((item) => item.id !== itemId))
    }, [])

    const isInCart = useCallback(
        (itemId: string) => {
            return (
                housingUnits.some((item) => item.id === itemId) ||
                services.some((item) => item.id === itemId)
            )
        },
        [housingUnits, services],
    )

    const total = [
        ...housingUnits.map((item) => item.price),
        ...services.map((item) => item.price * item.quantity),
    ].reduce((acc, price) => acc + price, 0)

    const getDaysDifference = useCallback((checkIn: Date, checkOut: Date) => {
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }, [])

    const getServiceIncompatibilityReason = useCallback(
        (service: Service, housingUnit: HousingUnit): string | null => {
            if (!service || !housingUnit) return null
            if (
                Array.isArray(service.availableHousingUnitTypeIds) &&
                service.availableHousingUnitTypeIds.length > 0
            ) {
                if (
                    !service.availableHousingUnitTypeIds.includes(
                        housingUnit.housingUnitTypeId,
                    )
                ) {
                    return 'Extra não disponível nesta acomodação.'
                }
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
                let hasAvailable = false
                for (let d = 0; d < days; d++) {
                    const date = new Date(housingUnit.checkIn)
                    date.setDate(date.getDate() + d)
                    if (service.availableWeekDays.includes(date.getDay())) {
                        hasAvailable = true
                        break
                    }
                }
                if (!hasAvailable)
                    return 'Extra não disponível na data de estadia escolhida.'
            }
            return null
        },
        [getDaysDifference],
    )

    return (
        <CartContext.Provider
            value={{
                housingUnits,
                services,
                addToCart,
                removeFromCart,
                isInCart,
                total,
                getServiceIncompatibilityReason,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = (): CartContextData => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }

    return context
}
