import axiosInstance from "@/lib/axios-instance";

export default async function searchAcomodacoes(payload: any) {
  const { data } = await axiosInstance.post("/property/search", payload);

  return data ?? [];
}
