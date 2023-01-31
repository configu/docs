import PropTypes from 'prop-types';
import React from 'react';

import Link from 'components/shared/link';
import slugToHref from 'utils/slug-to-href';

const Navigation = ({ previousLink, nextLink }) => (
  <div className="mt-10 flex w-full border-t border-dashed border-grey-80 pt-10 dark:border-grey-40 md:mt-5 md:pt-6">
    {previousLink && (
      <Link
        className="mr-auto max-w-[50%] xl:text-sm"
        nav="prev"
        theme="blue"
        to={slugToHref(previousLink.slug)}
      >
        {previousLink.title}
      </Link>
    )}
    {nextLink && (
      <Link
        className="ml-auto max-w-[50%] text-right xl:text-sm"
        theme="blue"
        to={slugToHref(nextLink.slug)}
        nav="next"
      >
        {nextLink.title}
      </Link>
    )}
  </div>
);

Navigation.propTypes = {
  previousLink: PropTypes.exact({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
  nextLink: PropTypes.exact({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
};

Navigation.defaultProps = {
  previousLink: null,
  nextLink: null,
};

export default Navigation;
