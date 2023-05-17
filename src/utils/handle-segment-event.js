import { navigate } from 'gatsby';

const handleSegmentEvent = (event, href, eventName, eventLocation) => {
  event.preventDefault();

  if (window.analytics) {
    if (href.includes('app.configu.com')) {
      window.analytics
        .track(eventName, {
          category: `Website ${eventName} click`,
          from: eventLocation || '/',
        })
        .then(() => {
          navigate(href);
        })
        .catch(() => {
          navigate(href);
        });
    }
  }

  return false;
};

export default handleSegmentEvent;
