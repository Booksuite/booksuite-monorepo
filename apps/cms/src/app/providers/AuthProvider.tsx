'use client'

import { Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'

import { TEST_COMPANY, useCurrentCompanyStore } from '@/common/contexts/user'
import { $api } from '@/common/providers/client'
import { getErrorMessage } from '@/common/utils'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { setCompany, company } = useCurrentCompanyStore()

    const { isLoading, isFetching, data, error } = $api.useQuery(
        'get',
        '/company/{id}',
        {
            params: { path: { id: TEST_COMPANY } },
        },
    )

    useEffect(() => {
        if (data) setCompany(data)
    }, [data, setCompany])

    if (!error && (isLoading || isFetching || !company)) {
        return <Spinner />
    }

    if (error) {
        return <div>{getErrorMessage(error, 'Erro ao carregar empresa')}</div>
    }

    return <>{children}</>
}
