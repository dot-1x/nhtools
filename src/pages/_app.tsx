import type { AppProps } from "next/app"
import Script from "next/script"
import "bootstrap/dist/css/bootstrap.css"
import "../style/style.css"
import '../style/custom.scss';
// import { useEffect, useState } from "react"

export default function App({ Component, pageProps }: AppProps) {
  // const [loaded, setLoaded] = useState(false)
  // useEffect(() => {
  //   if (!loaded) {
  //     alert(
  //       "url website akan segera berpindah, jika anda memilki deploy yang tersimpan, harap simpan code deploy agar tidak hilang"
  //     )
  //     setLoaded(true)
  //   }
  // }, [loaded])
  return (
    <>
      <Component {...pageProps} />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossOrigin="anonymous"
      ></Script>
    </>
  )
}
