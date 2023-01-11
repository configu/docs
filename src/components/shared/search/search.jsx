import algoliasearch from 'algoliasearch/lite';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';

import useDebounce from 'hooks/use-debounce';
import useOnClickOutside from 'hooks/use-on-click-outside';
import algoliaQueries from 'utils/algolia-queries';

import Input from './input';
import Results from './results';

const indices = [{ name: algoliaQueries[0].indexName, title: 'Docs', hitComp: 'postPageHit' }];

const Search = ({
  className,
  inputClassName,
  placeholderText,
  searchIconSize,
  additionalResultsStyles,
}) => {
  const ref = useRef(null);
  const [query, setQuery] = useState();
  const [hasFocus, setFocus] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  const searchClient = useMemo(
    () => algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY),
    []
  );

  const handleKeyPress = useCallback((event) => {
    if (event.metaKey && event.which === 75) {
      ref.current.querySelector('input').focus();
      setFocus(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useOnClickOutside(ref, () => setFocus(false));

  const shouldShowResult = !!debouncedQuery?.length && hasFocus;

  if (!process.env.GATSBY_ALGOLIA_APP_ID || !process.env.GATSBY_ALGOLIA_SEARCH_KEY) {
    return null;
  }

  return (
    <div className={clsx('relative', className)} ref={ref}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Input
          additionalClassName={clsx(inputClassName, {
            'transition duration-200 focus:border-blue-light dark:focus:border-blue-dark':
              !shouldShowResult,
          })}
          placeholder={placeholderText}
          hasFocus={hasFocus}
          iconSize={searchIconSize}
          onFocus={() => setFocus(true)}
        />
        {shouldShowResult && (
          <Results indices={indices} additionalStyles={additionalResultsStyles} />
        )}
      </InstantSearch>
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholderText: PropTypes.string,
  searchIconSize: PropTypes.string,
  additionalResultsStyles: PropTypes.string,
};

Search.defaultProps = {
  className: null,
  inputClassName: null,
  placeholderText: null,
  searchIconSize: null,
  additionalResultsStyles: null,
};

export default Search;
