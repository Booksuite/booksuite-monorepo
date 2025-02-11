import axiosInstance from "@/lib/axios-instance";

export default async function getAcomodacoes() {
  const { data } = await axiosInstance.get("/property");

  return data ?? [];
}
