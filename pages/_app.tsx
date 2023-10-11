import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css'

export default function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
    return <>
        <Head>
            <title>MyTop - найкращий топ</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap"  />
            <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}></meta>
            <meta property='og:locale' content='ru_RU'></meta>
        </Head>
        <Component {...pageProps} />
    </>
};