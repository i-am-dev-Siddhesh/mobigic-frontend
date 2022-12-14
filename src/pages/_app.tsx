import "../styles/globals.css";
import "../styles/login.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
