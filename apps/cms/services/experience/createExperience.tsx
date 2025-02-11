import axiosInstance from "../axios/axiosInstance";

import { CreateExperienceDTO } from "@/types/Experience";

const createExperience = async (payload: CreateExperienceDTO) => {
  try {
    const response = await axiosInstance.post(`/experience`, payload);

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

export { createExperience };
