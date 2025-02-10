"use client";

//import { queryClient } from "@/lib/react-query";
import ChakraThemeProvider from "./chakraThemeProvider";
import CssCacheProvider from "./cssCacheProvider";
//import { QueryClientProvider } from "@tanstack/react-query";
//import { CompanyProvider } from "./companyProvider";
import CartContextProvider from "../common/contexts/cartContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    //<QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <ChakraThemeProvider>
          <CssCacheProvider>
            {/*<CompanyProvider>*/}{children}{/*</CompanyProvider>*/}
          </CssCacheProvider>
        </ChakraThemeProvider>
      </CartContextProvider>
    //</QueryClientProvider>
  );
}
