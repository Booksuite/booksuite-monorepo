"use client";

import axiosInstance from "@/lib/axios-instance";
import { Company } from "@/types/Company";
import { createContext, useContext, useEffect, useState } from "react";

interface CompanyProviderProps {
  children: React.ReactNode;
}

export const CompanyContext = createContext(null);

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [company, setCompany] = useState<Company | null>(null);

  async function getSelectedCompany() {
    try {
      const response: any = await axiosInstance.get(`/company/${process.env.COMPANY_ID}`);

      if (response.data?.success) {
        if (response.data.company) {
          setCompany(response.data.company);
        }
      } else {
        setCompany(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!company) {
      getSelectedCompany();
    }
  }, []);

  return (
    <CompanyContext.Provider value={{ company, getSelectedCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompanyContext() {
  const context: { company: Company; getSeletectCompany: () => void } = useContext(CompanyContext);

  return context;
}
