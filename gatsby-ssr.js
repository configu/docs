/* eslint-disable import/prefer-default-export */
import React from 'react';

import { SidebarContextAPI } from './src/context/sidebar-context';

const SITE_DOMAIN = 'configu.com';
const ROLLUP_DOMAIN = 'rollup.configu.com';
const PLAUSIBLE_DOMAIN = 'plausible.io';
const SCRIPT_URI = '/js/plausible.js';

export const onRenderBody = ({ setPreBodyComponents, setHtmlAttributes, setHeadComponents }) => {
  if (process.env.NODE_ENV === 'production') {
    const scriptProps = {
      'data-domain': `${SITE_DOMAIN}, ${ROLLUP_DOMAIN}`,
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
  
  const isDarkModeSetInLocalStorage = localStorage.theme && JSON.parse(localStorage.theme) === 'dark';
  const isSystemThemeEnabled = localStorage.theme && JSON.parse(localStorage.theme) === 'system' || !('theme' in localStorage);
  const isSystemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (isDarkModeSetInLocalStorage || (isSystemThemeEnabled && isSystemDarkMode)) {
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

export const wrapRootElement = ({ element }) => <SidebarContextAPI>{element}</SidebarContextAPI>;
