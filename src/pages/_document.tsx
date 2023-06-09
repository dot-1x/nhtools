import { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/assets/roleHeads/Boruto.png" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
