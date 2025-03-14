import { UpdateServiceDTO } from '@/common/types/Service'
import axiosInstance from '../axios/axiosInstance'

const updateService = async (
    id: number | string,
    payload: UpdateServiceDTO,
) => {
    try {
        const response = await axiosInstance.patch(`/experience/${id}`, payload)

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

export { updateService }
