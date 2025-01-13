import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}