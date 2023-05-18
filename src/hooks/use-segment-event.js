import { useLocation } from '@reach/router';
import { navigate } from 'gatsby';

export default function useSegmentEvent() {
  const location = useLocation();

  const handleSegmentEvent = (event, href, eventName) => {
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
  };

  return { handleSegmentEvent };
}
