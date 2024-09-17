import '../styles/global.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Daniel Neri</title>
        <meta name="description" content="Daniel Neri é um desenvolvedor full stack especializado em criar soluções web eficientes e escaláveis." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Daniel Neri - Desenvolvedor Full Stack" />
        <meta property="og:description" content="Daniel Neri é um desenvolvedor full stack especializado em criar soluções web eficientes e escaláveis." />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);