import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { Configure, InstantSearch } from 'react-instantsearch-dom';

import Input from 'components/shared/search/input';
import Results from 'components/shared/search/results';
import useAlgoliaSearch from 'hooks/use-algolia-search';
import algoliaQueries from 'utils/algolia-queries';

const indices = [{ name: algoliaQueries[0].indexName, title: 'Docs', hitComp: 'postPageHit' }];

const SearchModal = ({ isOpen, closeModal }) => {
  const { query, setQuery, setFocus, hasFocus, searchClient } = useAlgoliaSearch();
  const shouldShowResult = !!query?.length && hasFocus;
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.querySelector('input').focus();
    }
  }, [isOpen]);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <Configure clickAnalytics />
      <div
        className={clsx(
          isOpen ? 'block' : 'hidden',
          'fixed inset-0 z-[100] bg-white dark:bg-grey-15'
        )}
        ref={ref}
      >
        <div className="flex items-center justify-between space-x-4 border-b border-grey-96 py-4 px-7 dark:border-grey-40 sm:px-4 [&>div]:grow">
          <Input
            placeholder="Search"
            hasFocus={hasFocus}
            iconSize="md"
            type="mobile"
            onFocus={() => setFocus(true)}
          />
          <button
            className="shrink font-mono text-sm font-semibold leading-tight text-blue-light dark:text-blue-dark"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
        {shouldShowResult ? (
          <Results indices={indices} type="mobile" />
        ) : (
          <span className="mt-3.5 block text-center text-xs leading-none text-grey-50 ">
            No recent searches
          </span>
        )}
      </div>
    </InstantSearch>
  );
};

SearchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default SearchModal;
