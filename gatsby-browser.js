import './src/styles/main.css';

// eslint-disable-next-line import/prefer-default-export
export const onRouteUpdate = () => {
  if (process.env.NODE_ENV === 'production' && typeof window.plausible !== 'undefined') {
    window.plausible('pageview');
  }
};
