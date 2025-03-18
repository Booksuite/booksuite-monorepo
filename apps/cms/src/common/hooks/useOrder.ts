import { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import { createQueryString } from '../utils/searchParams'

interface UseSearchParamsPaginationProps<T extends string> {
    currentPath: Route
    defaultOrder?: T
    defaultDirection?: 'asc' | 'desc'
}

export function useSearchParamsOrder<T extends string>({
    defaultOrder = 'createdAt' as T,
    defaultDirection = 'asc',
    currentPath,
}: UseSearchParamsPaginationProps<T>) {
    const searchParams = useSearchParams()
    const { push } = useRouter()

    const orderBy = searchParams.get('orderBy')
        ? searchParams.get('orderBy')
        : defaultOrder

    const orderDirection = searchParams.get('orderDirection')
        ? searchParams.get('orderDirection')
        : defaultDirection

    const setOrderBy = useCallback(
        (orderBy: string) => {
            push(`${currentPath}?${createQueryString('orderBy', orderBy)}`)
        },
        [currentPath, push],
    )

    const setOrderDirection = useCallback(
        (orderDirection: 'asc' | 'desc') => {
            push(
                `${currentPath}?${createQueryString(
                    'orderDirection',
                    orderDirection,
                )}`,
            )
        },
        [currentPath, push],
    )

    return {
        orderBy: orderBy as T,
        orderDirection: orderDirection as 'asc' | 'desc',
        setOrderBy,
        setOrderDirection,
    }
}
