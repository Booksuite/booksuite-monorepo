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
}

export interface Service {
    id: string
    name: string
    price: number
    image: string
    quantity: number
}

interface CartContextData {
    housingUnits: HousingUnit[]
    services: Service[]
    addToCart: (item: HousingUnit | Service) => void
    removeFromCart: (itemId: string) => void
    clearCart: () => void
    isInCart: (itemId: string) => boolean
    total: number
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [housingUnits, setHousingUnits] = useState<HousingUnit[]>([])
    const [services, setServices] = useState<Service[]>([])

    const addToCart = useCallback((item: HousingUnit | Service) => {
        if ('checkIn' in item) {
            setHousingUnits((state) => [...state, item as HousingUnit])
        } else {
            setServices((state) => [...state, item as Service])
        }
    }, [])

    const removeFromCart = useCallback((itemId: string) => {
        setHousingUnits((state) => state.filter((item) => item.id !== itemId))
        setServices((state) => state.filter((item) => item.id !== itemId))
    }, [])

    const clearCart = useCallback(() => {
        setHousingUnits([])
        setServices([])
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

    const total = [...housingUnits, ...services].reduce(
        (acc, item) => acc + item.price,
        0,
    )

    return (
        <CartContext.Provider
            value={{
                housingUnits,
                services,
                addToCart,
                removeFromCart,
                clearCart,
                isInCart,
                total,
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
