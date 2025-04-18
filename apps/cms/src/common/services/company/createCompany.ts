import { CreateCompanyDTO } from '@/common/types/Company'
import axiosInstance from '../axios/axiosInstance'

const createCompany = async (payload: CreateCompanyDTO) => {
    try {
        const response = await axiosInstance.post(`/company`, payload)

        if (response && response.data) {
            return response.data
        } else {
            throw new Error('Nenhum dado retornado da API.')
        }
    } catch (error) {
        throw error
    }
}

export { createCompany }
