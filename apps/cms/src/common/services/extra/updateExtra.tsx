import { UpdateExtraDTO } from '@/common/types/Extra'
import axiosInstance from '../axios/axiosInstance'

const updateExtra = async (id: number | string, payload: UpdateExtraDTO) => {
    try {
        const response = await axiosInstance.patch(`/extra/${id}`, payload)

        if (response && response.data) {
            return response.data
        } else {
            throw new Error('Nenhum dado retornado da API.')
        }
    } catch (error) {
        throw error
    }
}

export { updateExtra }
