import axios from "axios";
import { getSession } from "next-auth/react";

import { signOut } from "next-auth/react";

const baseURL = process.env.API_URL;

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      request.headers.Authorization = `Bearer ${session.user.token}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);

      if (error.response.data.message === "jwt expired") {
        signOut();
      }

      return error;
    }
  );

  return instance;
};

export default ApiClient();
