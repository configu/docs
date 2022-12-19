import { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';

import { MAIN_SITE_DOMAIN } from 'constants/nav';

import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect';

const ThemeContext = createContext([]);
export { ThemeContext };

export function useDarkModeInit() {
  const [cookies, setCookie] = useCookies(['dark-mode-enabled']);
  const isSystemDarkMode =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSystemThemeEnabled =
    typeof window !== 'undefined'
      ? document.cookie.split(';').some((item) => item.includes('theme=system')) ||
        !document.cookie.split(';').filter((item) => item.trim().startsWith('theme=')).length > 0
      : false;
  const enabled =
    cookies['dark-mode-enabled'] === 'true' || (isSystemThemeEnabled && isSystemDarkMode);

  const handleDarkTheme = (value) =>
    setCookie('dark-mode-enabled', value, {
      domain: MAIN_SITE_DOMAIN,
    });

  useIsomorphicLayoutEffect(() => {
    const className = 'dark';
    const element = document.documentElement;
    if (enabled) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [enabled]);

  return [enabled, handleDarkTheme];
}

function useDarkMode() {
  return useContext(ThemeContext);
}

export default useDarkMode;
