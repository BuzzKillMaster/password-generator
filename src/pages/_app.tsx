import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Head>
          <title>Password Generator</title>
          <meta name="description"
                content="Create secure passwords that are more difficult to guess or crack, with settings for length, character types and more."/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Component {...pageProps} />
      </>
  )
}
