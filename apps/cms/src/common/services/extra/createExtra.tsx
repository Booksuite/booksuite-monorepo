import { CreateExtraDTO } from '@/common/types/Extra'
import axiosInstance from '../axios/axiosInstance'

const createExtra = async (payload: CreateExtraDTO) => {
    try {
        const response = await axiosInstance.post(`/extra`, payload)

        if (response && response.data) {
            return response.data
        } else {
            throw new Error('Nenhum dado retornado da API.')
        }
    } catch (error) {
        throw error
    }
}

export { createExtra }
