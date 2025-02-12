import axiosInstance from "../axios/axiosInstance";

import { UpdateCompanyDTO } from "@/types/Company";

const updateCompany = async (id: number | string, payload: UpdateCompanyDTO) => {
  try {
    const response = await axiosInstance.patch(`/company/${id}`, payload);

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

export { updateCompany };
