import { useEffect, useState } from 'react'

import { Acomodacao } from '@/common/types/Acomodacao'
import axiosInstance from '@/services/axios/axiosInstance'

export function useGetAcomodacao(id?: number | string) {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [acomodacao, setAcomodacao] = useState<Acomodacao | null>(null)

    useEffect(() => {
        async function getAcomodacao() {
            setIsLoading(true)

            try {
                const { data } = await axiosInstance.get(
                    `/property${id ? '/' + id : ''}`,
                )

                if (data?.success) {
                    setAcomodacao(id ? data.property : data.properties)
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
        getAcomodacao()
    }, [])

    return { isLoading, error, acomodacao }
}
