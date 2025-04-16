'use client'

import { useGetCompanyById } from '@booksuite/sdk'
import { CircularProgress } from '@mui/material'
import { useEffect } from 'react'

import { TEST_COMPANY, useCurrentCompanyStore } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { setCompany, company } = useCurrentCompanyStore()

    const { isLoading, isFetching, data, error } = useGetCompanyById(
        {
            id: TEST_COMPANY,
        },
        {
            query: {
                refetchInterval: false,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
            },
        },
    )

    useEffect(() => {
        if (data) setCompany(data)
    }, [data, setCompany])

    if (!error && (isLoading || isFetching || !company)) {
        return <CircularProgress />
    }

    if (error) {
        return <div>{getErrorMessage(error, 'Erro ao carregar empresa')}</div>
    }

    return <>{children}</>
}
