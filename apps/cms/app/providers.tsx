"use client";

import { SessionProvider } from "next-auth/react";

import ChakraThemeProvider from "./providers/chakraThemeProvider";
import CssCacheProvider from "./providers/cssCacheProvider";
import { SidebarProvider } from "./providers/sidebarProvider";
import TanstackQueryProvider from "./providers/tanstackQueryProvider";
import { Session } from "next-auth";
import { CompanyProvider } from "./providers/companyProvider";

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <CssCacheProvider>
      <ChakraThemeProvider>
        <SessionProvider session={session}>
          <TanstackQueryProvider>
            <CompanyProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </CompanyProvider>
          </TanstackQueryProvider>
        </SessionProvider>
      </ChakraThemeProvider>
    </CssCacheProvider>
  );
}
