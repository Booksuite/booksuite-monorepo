import { CreateExperienceDTO } from '@/common/types/Experience'
import axiosInstance from '../axios/axiosInstance'

const createExperience = async (payload: CreateExperienceDTO) => {
    try {
        const response = await axiosInstance.post(`/experience`, payload)

        if (response && response.data) {
            return response.data
        } else {
            throw new Error('Nenhum dado retornado da API.')
        }
    } catch (error) {
        throw error
    }
}

export { createExperience }
