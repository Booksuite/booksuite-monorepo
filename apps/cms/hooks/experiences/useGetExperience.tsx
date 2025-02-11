import axiosInstance from "@/services/axios/axiosInstance";
import type { Experience } from "@/types/Experience";
import { useEffect, useState } from "react";

export function useGetExperience(id: number | string) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [experience, setExperience] = useState<Experience | null>(null);

  useEffect(() => {
    async function updateExperience() {
      setIsLoading(true);

      try {
        const { data } = await axiosInstance.get(`/experience/${id}`);

        if (data?.success) {
          setExperience(data.experience);
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          // and an instance of http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }

        setError("errore");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    updateExperience();
  }, []);

  return { isLoading, error, experience };
}
