/* eslint-disable react/prop-types, jsx-a11y/html-has-lang */
import React from 'react';

const fontsBasePath = process.env.NODE_ENV === 'production' ? '/fonts' : '/fonts';

const fontsPaths = [
  '/plus-jakarta-sans/plus-jakarta-sans-600.woff2',
  '/space-grotesk/space-grotesk-400.woff2',
  '/space-grotesk/space-grotesk-600.woff2',
];

const HTML = ({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents,
}) => (
  <html {...htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
      />
      {fontsPaths.map((fontPath, index) => (
        <link
          rel="preload"
          href={`${fontsBasePath}${fontPath}`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          key={index}
        />
      ))}
      <link
        href={`${fontsBasePath}/fonts-fallback.css`}
        rel="stylesheet"
        type="text/css"
        as="style"
      />
      <link
        href={`${fontsBasePath}/fonts-development.css`}
        rel="stylesheet"
        type="text/css"
        as="style"
      />
      {headComponents}
    </head>
    <body {...bodyAttributes}>
      {preBodyComponents}
      <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
      {postBodyComponents}
    </body>
  </html>
);

export default HTML;
