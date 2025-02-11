import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface TanstackQueryProviderProps {
  children: React.ReactNode;
}

export default function TanstackQueryProvider(props: TanstackQueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
}
