import { GoogleAnalytics } from "nextjs-google-analytics";

import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics trackPageViews gaMeasurementId="UA-99611142-1" />
      <Component {...pageProps} />
    </>
  );
}
