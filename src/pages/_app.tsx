import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import TabBar from "./tab";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full mx-auto">
      <Component {...pageProps} />
    </div>
  );
}
