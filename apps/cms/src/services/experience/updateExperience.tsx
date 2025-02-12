import axiosInstance from "../axios/axiosInstance";

import { UpdateExperienceDTO } from "@/types/Experience";

const updateExperience = async (id: number | string, payload: UpdateExperienceDTO) => {
  try {
    const response = await axiosInstance.patch(`/experience/${id}`, payload);

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

export { updateExperience };
