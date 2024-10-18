import { PreferencesProvider } from "@/context/PreferencesContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PreferencesProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </PreferencesProvider>
  );
}
