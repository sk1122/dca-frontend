import React from "react";
import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en" >
    <Head>
      <meta charSet="utf-8" />
      <meta property="og:type" content="website" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);
export default Document;
