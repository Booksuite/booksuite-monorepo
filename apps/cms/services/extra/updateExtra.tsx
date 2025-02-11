import axiosInstance from "../axios/axiosInstance";

import { UpdateExtraDTO } from "@/types/Extra";

const updateExtra = async (id: number | string, payload: UpdateExtraDTO) => {
  try {
    const response = await axiosInstance.patch(`/extra/${id}`, payload);

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

export { updateExtra };
