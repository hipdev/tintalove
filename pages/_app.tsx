import React from "react";
import { AppProps } from "next/app";
import "../styles/global.css"; // <- applied everywhere in the NextJS application scope

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
