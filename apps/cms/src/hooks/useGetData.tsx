import axiosInstance from '@/services/axios/axiosInstance'
import { useEffect, useState } from 'react'

export function useGetData(url: string) {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<any | null>(null)

    useEffect(() => {
        async function getData() {
            setIsLoading(true)

            try {
                const response = await axiosInstance.get(url)

                if (response.data) {
                    setData(response.data)
                } else {
                    setData(null)
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
        getData()
    }, [])

    return { isLoading, error, data }
}
