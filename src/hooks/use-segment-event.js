import { useLocation } from '@reach/router';
import { navigate } from 'gatsby';
import { useCallback } from 'react';

export default function useSegmentEvent(shouldUse = false) {
  const location = useLocation();

  const handleSegmentEvent = useCallback(
    (href, eventName) => (event) => {
      if (!shouldUse) {
        return () => {};
      }

      event.preventDefault();

      if (window.analytics) {
        window.analytics
          .track(eventName, {
            category: `Website ${eventName} click`,
            from: location.href,
          })
          .then(() => {
            navigate(href);
          })
          .catch(() => {
            navigate(href);
          });
      } else {
        navigate(href);
      }

      return false;
    },
    [location.href, shouldUse]
  );

  return { handleSegmentEvent };
}
