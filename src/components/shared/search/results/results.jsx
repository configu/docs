import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Index,
  connectHits,
  connectStateResults,
  Highlight,
  Snippet,
} from 'react-instantsearch-dom';

import Link from 'components/shared/link';

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults?.nbHits;

  return (
    <span className="font-mono text-xs text-grey-50">
      <span className="font-bold text-grey-50">{hitCount}</span> result
      {hitCount !== 1 || hitCount === 0 ? `s` : ``}
    </span>
  );
});

const NoResults = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults?.nbHits;
  const query = searchResults?.query;

  return (
    <div className="flex flex-col px-2.5 pb-2.5 text-xs text-grey-70 dark:text-grey-60">
      <span className="font-bold">
        {hitCount || 'No'} result{hitCount !== 1 || hitCount === 0 ? `s` : ``} for “{query}”
      </span>

      <span className="dark:text-grey-50">Check if the request is correct or try another one</span>
    </div>
  );
});

const PageHit = ({ hit }) => (
  <div className="with-highlighted-text">
    <Link className="block" to={hit.slug}>
      <h4 className="highlight-text font-mono text-xs font-semibold">
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet
      className="mt-1.5 block text-xs leading-relaxed text-grey-50"
      attribute="excerpt"
      hit={hit}
      tagName="mark"
    />
  </div>
);

PageHit.propTypes = {
  hit: PropTypes.shape({
    objectID: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

const Hits = connectHits(({ hits, showAll }) =>
  hits?.length ? (
    <ul className="divide-y divide-dashed divide-grey-80 px-2.5 dark:divide-grey-25">
      {hits.slice(0, showAll ? hits.length : 5).map((hit) => (
        <li className="py-2.5 first:pt-0" key={hit.objectID}>
          <PageHit hit={hit} />
        </li>
      ))}
    </ul>
  ) : (
    <NoResults />
  )
);

const Results = ({ indices, additionalStyles }) => (
  <div className="absolute left-0 right-0 bottom-0 z-10 translate-y-full overflow-hidden rounded-b border border-t-0 border-grey-80 bg-white dark:border-grey-40 dark:bg-grey-15">
    <div className={clsx('overflow-y-scroll pt-2.5', additionalStyles)}>
      {indices.map(({ name }) => (
        <Index indexName={name} key={name}>
          <Hits showAll />
        </Index>
      ))}
    </div>
    <div className="flex justify-between border-t border-grey-80 bg-[#fbfcfd] p-2.5 dark:border-grey-40 dark:bg-grey-25">
      <Link
        className="font-mono text-xs font-normal text-grey-50 transition-colors duration-200 dark:text-grey-50"
        to="https://www.algolia.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Search by Algolia</span>
      </Link>
      <HitCount />
    </div>
  </div>
);
Results.propTypes = {
  indices: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      hitComp: PropTypes.string.isRequired,
    })
  ).isRequired,
  additionalStyles: PropTypes.string,
};

Results.defaultProps = {
  additionalStyles: null,
};

export default Results;
