/* eslint-disable import/prefer-default-export */
import React from 'react';

const SITE_DOMAIN = 'configu.com';
const PLAUSIBLE_DOMAIN = 'plausible.io';
const SCRIPT_URI = '/js/plausible.js';

export const onRenderBody = ({ setPreBodyComponents, setHtmlAttributes, setHeadComponents }) => {
  if (process.env.NODE_ENV === 'production') {
    const scriptProps = {
      'data-domain': SITE_DOMAIN,
      src: `https://${PLAUSIBLE_DOMAIN}${SCRIPT_URI}`,
    };

    setHeadComponents([
      // eslint-disable-next-line react/jsx-filename-extension
      <link key="plausible-preconnect" rel="preconnect" href={`https://${PLAUSIBLE_DOMAIN}`} />,
      <script key="plausible-script" defer {...scriptProps} />,
      // See: https://plausible.io/docs/custom-event-goals#1-trigger-custom-events-with-javascript-on-your-site
      <script
        key="plausible-custom-events"
        dangerouslySetInnerHTML={{
          __html: `
            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };
          `,
        }}
      />,
    ]);
  }

  setHtmlAttributes({ lang: 'en', prefix: 'og: http://ogp.me/ns#' });
  setPreBodyComponents([
    // eslint-disable-next-line react/jsx-filename-extension
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  if (typeof window === 'undefined') return;
  
  const isDarkModeSetInCookie = document.cookie.split(';').some((item) => item.includes('theme=dark'));
  const isSystemThemeEnabled = document.cookie.split(';').some((item) => item.includes('theme=system')) || !document.cookie.split(';').filter((item) => item.trim().startsWith('theme=')).length > 0;
  const isSystemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (isDarkModeSetInCookie || (isSystemThemeEnabled && isSystemDarkMode)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})()`,
      }}
      key="theme-picker"
    />,
  ]);

  return null;
};
