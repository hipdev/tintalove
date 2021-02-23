import React from "react";
import { AppProps } from "next/app";
import "../styles/global.css"; // <- applied everywhere in the NextJS application scope
import { createStore, StateMachineProvider } from "little-state-machine";
import AuthProvider from "components/authProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  createStore({});

  return (
    <StateMachineProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </StateMachineProvider>
  );
};

export default MyApp;
