import { DocSearch } from '@docsearch/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import Link from 'components/shared/link';
import debounce from 'utils/debounce';

const Search = ({ className }) => {
  // @NOTE: this is a workaround to prevent scroll to the page bottom when closing search modal in Safari
  // https://github.com/algolia/docsearch/issues/1260#issuecomment-1011939736
  useEffect(() => {
    let div = document.querySelector('.fixed[data-docsearch-fixed]');

    if (!div) {
      div = document.createElement('div');
      div.classList.add('fixed');
      div.setAttribute('data-docsearch-fixed', '');
      div.innerHTML = '<input type="text" aria-label="hidden">';
      document.body.appendChild(div);
    }
  }, []);

  return (
    <div className={clsx('relative flex items-center justify-between', className)}>
      <DocSearch
        appId={process.env.GATSBY_ALGOLIA_APP_ID}
        apiKey={process.env.GATSBY_ALGOLIA_SEARCH_API_KEY}
        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
        placeholder="Search..."
        transformSearchClient={(searchClient) => ({
          ...searchClient,
          search: debounce(searchClient.search, 500),
        })}
        hitComponent={({ hit, children }) => (
          <Link
            className={clsx({
              'DocSearch-Hit--Result': hit.__is_result?.(),
              'DocSearch-Hit--Parent': hit.__is_parent?.(),
              'DocSearch-Hit--FirstChild': hit.__is_first?.(),
              'DocSearch-Hit--LastChild': hit.__is_last?.(),
              'DocSearch-Hit--Child': hit.__is_child?.(),
            })}
            to={hit.url.replace('/docs', '')}
          >
            {children}
          </Link>
        )}
        transformItems={(items) =>
          items.map((item, index) => {
            const a = document.createElement('a');
            a.href = item.url;

            if (item.hierarchy?.lvl0) {
              item.hierarchy.lvl0 = item.hierarchy.lvl0.replace(/&amp;/g, '&');
            }

            if (item._highlightResult?.hierarchy?.lvl0?.value) {
              item._highlightResult.hierarchy.lvl0.value =
                item._highlightResult.hierarchy.lvl0.value.replace(/&amp;/g, '&');
            }

            return {
              ...item,
              url: `${a.pathname}${a.hash}`,
              __is_result: () => true,
              __is_parent: () => item.type === 'lvl1' && items.length > 1 && index === 0,
              __is_child: () =>
                item.type !== 'lvl1' && items.length > 1 && items[0].type === 'lvl1' && index !== 0,
              __is_first: () => index === 1,
              __is_last: () => index === items.length - 1 && index !== 0,
            };
          })
        }
        insights
      />
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
};

Search.defaultProps = {
  className: '',
};

export default Search;
