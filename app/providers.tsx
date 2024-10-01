'use client';

import { ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient()
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // server always make a new query client
    return makeQueryClient();
  } else {
    // in client side check if browserQueryClient was initialize
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1565c0'
    }
  }
})

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}