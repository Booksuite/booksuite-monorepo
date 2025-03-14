import { CreateServiceDTO } from '@/common/types/Service'
import axiosInstance from '../axios/axiosInstance'

const createService = async (payload: CreateServiceDTO) => {
    try {
        const response = await axiosInstance.post(`/Service`, payload)

        if (response && response.data) {
            return response.data
        } else {
            throw new Error('Nenhum dado retornado da API.')
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

export { createService }
