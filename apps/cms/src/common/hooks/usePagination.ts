import { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import { createQueryString } from '../utils/searchParams'

interface UseSearchParamsPaginationProps {
    currentPath: Route
    defaultPage?: number
    defaultItemsPerPage?: number
}

export function useSearchParamsPagination({
    defaultPage = 1,
    defaultItemsPerPage = 10,
    currentPath,
}: UseSearchParamsPaginationProps) {
    const searchParams = useSearchParams()
    const { push } = useRouter()

    const page = searchParams.get('page')
        ? Number(searchParams.get('page'))
        : defaultPage
    const itemsPerPage = searchParams.get('itemsPerPage')
        ? Number(searchParams.get('itemsPerPage'))
        : defaultItemsPerPage

    const setPage = useCallback(
        (page: number) => {
            push(`${currentPath}?${createQueryString('page', page.toString())}`)
        },
        [currentPath, push],
    )

    const setItemsPerPage = useCallback(
        (itemsPerPage: number) => {
            push(
                `${currentPath}?${createQueryString(
                    'itemsPerPage',
                    itemsPerPage.toString(),
                )}`,
            )
        },
        [currentPath, push],
    )

    return { page, itemsPerPage, setPage, setItemsPerPage }
}
