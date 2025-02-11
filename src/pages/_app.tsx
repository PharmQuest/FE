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
    description: '해외에서 당황하지 말고 현지 상비약과 약국 정보는 어디약에서!'
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
        <link rel="icon" href="/svgs/favicon.svg"/>
        <meta name="description" content={pageData.description} />
        <meta property="og:title" content={pageData.title} />
        <meta property="og:description" content={pageData.description} />
        <meta property="og:image" content="/images/og-image.webp" />
        <title>{pageData.title}</title>
      </Head>
      <Header />
      {/* 최소 높이 = 100vh - 헤더높이 - 푸터높이 */}
      <div className={`lg:min-h-[calc(100vh-279px)] min-h-[calc(100vh-225px)]`}>
        <Component {...pageProps}/>
      </div>
      <NoticeModal/>
      <ReportModal/>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}