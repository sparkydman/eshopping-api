import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import '../styles/globals.css';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
