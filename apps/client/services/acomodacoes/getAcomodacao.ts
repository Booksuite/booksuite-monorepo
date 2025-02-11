import axiosInstance from "@/lib/axios-instance";

export default async function getAcomodacoes(id: number | string) {
  const { data } = await axiosInstance.get(`/property/${id}`);

  return data ?? null;
}
