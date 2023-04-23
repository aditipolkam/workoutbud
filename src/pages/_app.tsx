import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/context/authContext";
import MainLayout from "@/components/layout/MainLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
