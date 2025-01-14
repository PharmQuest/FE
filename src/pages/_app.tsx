import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {

  const pageData = {
    title: '어디약',
    description: '해외 약정보는? 어디약에서!'
  }

  return (
    <>
      <Head>
        <meta name="description" content={pageData.description} />
        <meta property="og:title" content={pageData.title} />
        <meta property="og:description" content={pageData.description} />
        <title>{pageData.title}</title>
      </Head>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}