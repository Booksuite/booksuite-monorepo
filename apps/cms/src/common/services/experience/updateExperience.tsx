import { UpdateExperienceDTO } from '@/common/types/Experience'
import axiosInstance from '../axios/axiosInstance'

const updateExperience = async (
    id: number | string,
    payload: UpdateExperienceDTO,
) => {
    try {
        const response = await axiosInstance.patch(`/experience/${id}`, payload)

        if (response && response.data) {
            return response.data
        } else {
            throw new Error('Nenhum dado retornado da API.')
        }
    } catch (error) {
        throw error
    }
}

export { updateExperience }
