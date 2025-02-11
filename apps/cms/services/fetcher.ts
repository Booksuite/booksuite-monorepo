import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
interface FetcherOptions extends RequestInit {
  headers?: { [key: string]: string };
}

export async function fetcher(url: string, options: FetcherOptions = {}): Promise<any> {
  const session = await getServerSession(authOptions);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (session?.user?.token) {
    headers.Authorization = `Bearer ${session.user?.token}`;
  } else {
    return;
  }

  const config: FetcherOptions = {
    ...options,
    headers,
  };

  try {
    const res = await fetch(process.env.API_URL + url, config);

    if (!res.ok) {
      const errorText = await res.text();
      return errorText;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Erro ao fazer fetch:", error);
    throw error;
  }
}
