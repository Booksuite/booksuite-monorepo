import { UpdateAcomodacaoDTO } from '@/common/types/Acomodacao'
import axiosInstance from '../axios/axiosInstance'

const updateAcomodacao = async (
    id: number | string,
    payload: UpdateAcomodacaoDTO,
) => {
    try {
        const response = await axiosInstance.patch(`/property/${id}`, payload)

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

export { updateAcomodacao }
