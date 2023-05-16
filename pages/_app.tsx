import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface Props extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  return getLayout(<Component {...pageProps} />);
}
