import { useEffect, useState } from 'react'

import type { Extra } from '@/common/types/Extra'
import axiosInstance from '@/services/axios/axiosInstance'

export function useGetExtra(id?: number | string) {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [extra, setExtra] = useState<Extra | null>(null)

    useEffect(() => {
        async function getExtra() {
            setIsLoading(true)

            try {
                const { data } = await axiosInstance.get(
                    `/extra${id ? '/' + id : ''}`,
                )

                if (data?.success) {
                    setExtra(id ? data.extra : data.extras)
                }
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser
                    // and an instance of http.ClientRequest in node.js
                    console.log(error.request)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message)
                }

                setError('error')
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getExtra()
    }, [])

    return { isLoading, error, extra: extra }
}
