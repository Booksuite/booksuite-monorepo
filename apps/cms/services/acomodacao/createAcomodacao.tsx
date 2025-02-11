import axiosInstance from "../axios/axiosInstance";

import { CreateAcomodacaoDTO } from "@/types/Acomodacao";

const createAcomodacao = async (payload: CreateAcomodacaoDTO) => {
  try {
    const response = await axiosInstance.post(`/property`, payload);

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Nenhum dado retornado da API.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createAcomodacao };
