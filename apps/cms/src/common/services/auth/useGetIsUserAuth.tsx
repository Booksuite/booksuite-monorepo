import axiosInstance from '@/services/axios/axiosInstance'

const useGetIsUserAuth = async () => {
    try {
        const { data } = await axiosInstance.get(`/auth/me`)

        return data
    } catch (error) {}
}

export { useGetIsUserAuth }
