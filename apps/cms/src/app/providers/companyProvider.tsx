'use client'

import { getCookie, setCookie } from 'cookies-next'
import {
    createContext,
    type Dispatch,
    type SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react'

import type { Company } from '@/common/types/Company'
import axiosInstance from '@/common/services/axios/axiosInstance'

interface CompanyProviderProps {
    children: React.ReactNode
}

export const CompanyContext = createContext(null)

export function CompanyProvider({ children }: CompanyProviderProps) {
    const cookieValue = getCookie('company')

    const [isLoading, setIsLoading] = useState(false)
    const [company, setCompany] = useState(null)

    async function refreshCompany() {
        if (isLoading) {
            return
        }

        setIsLoading(true)

        try {
            const response: any = await axiosInstance.get(
                `/company/${cookieValue}`,
            )

            if (response.data?.success) {
                if (response.data?.company) {
                    setCompany(response.data.company)
                }
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setCookie('company', 1, { maxAge: 60 * 60 * 24 * 30 * 365 })
    }, [company])

    useEffect(() => {
        refreshCompany()
    }, [])

    return (
        <CompanyContext.Provider
            value={{ company, setCompany, refreshCompany, isLoading }}
        >
            {children}
        </CompanyContext.Provider>
    )
}

export function useCompanyContext() {
    const context: {
        company: Company
        setCompany: Dispatch<SetStateAction<Company>>
        refreshCompany: () => void
        isLoading: boolean
    } = useContext(CompanyContext)

    return context
}
