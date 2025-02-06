/*import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../common/lib/axios-instance";
import { Company } from "../common/types/company";

interface CompanyContextType {
  company: Company | null;
  getSelectedCompany: () => Promise<void>;
}

interface CompanyProviderProps {
  children: React.ReactNode;
}

export const CompanyContext = createContext<CompanyContextType | null>(null);

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [company, setCompany] = useState<Company | null>(null);

  async function getSelectedCompany() {
    try {
      const response: any = await axiosInstance.get(`/company/${process.env.COMPANY_ID}`);

      if (response.data?.success) {
        setCompany(response.data.company ?? null);
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
  const context = useContext(CompanyContext);
  
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }

  return context;
}*/
