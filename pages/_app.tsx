import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Layout } from "../components/Layout";

const darkTheme = createTheme({
  type: "dark",
});

const lightTheme = createTheme({
  type: "light",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider theme={darkTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
