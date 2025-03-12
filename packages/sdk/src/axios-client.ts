import axios from 'axios'

import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Subset of AxiosRequestConfig
 */
export type RequestConfig<TData = unknown> = {
    baseURL?: string
    url?: string
    method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'
    params?: unknown
    data?: TData | FormData
    responseType?:
        | 'arraybuffer'
        | 'blob'
        | 'document'
        | 'json'
        | 'text'
        | 'stream'
    signal?: AbortSignal
    headers?: AxiosRequestConfig['headers']
}
/**
 * Subset of AxiosResponse
 */
export type ResponseConfig<TData = unknown> = {
    data: TData
    status: number
    statusText: string
    headers?: AxiosResponse['headers']
}

export type ResponseErrorConfig<TError = unknown> = TError

export const axiosInstance = axios.create({})

export const client = async <TData, TError = unknown, TVariables = unknown>(
    config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData>> => {
    const promise = axiosInstance
        .request<TVariables, ResponseConfig<TData>>(config)
        .catch((e: AxiosError<TError>) => {
            throw e
        })

    return promise
}

export default client
