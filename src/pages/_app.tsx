import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import NoticeModal from "./community/components/NoticeModal";
import ReportModal from "./community/post/components/ReportModal";

export default function App({ Component, pageProps }: AppProps) {

  const pageData = {
    title: '어디약',
    description: '해외 약정보는? 어디약에서!'
  }

  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="description" content={pageData.description} />
        <meta property="og:title" content={pageData.title} />
        <meta property="og:description" content={pageData.description} />
        <title>{pageData.title}</title>
      </Head>
      <div className={`overflow-hidden`}>
      <Header />
      </div>
      <Component {...pageProps} />
      <NoticeModal/>
      <ReportModal/>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}