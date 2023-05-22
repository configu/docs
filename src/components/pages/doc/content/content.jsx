import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import React, { forwardRef, Fragment } from 'react';

import Admonition from 'components/shared/admonition';
import Anchor from 'components/shared/anchor';
import AnchorHeading from 'components/shared/anchor-heading';
import CodeBlock from 'components/shared/code-block';
import CodeTabs from 'components/shared/code-tabs';
import Collapsible from 'components/shared/collapsible';
import CollapsibleItem from 'components/shared/collapsible/collapsible-item';
import DefinitionList from 'components/shared/definition-list';
import Link from 'components/shared/link';
import getIdFromChildren from 'utils/get-id-from-children';
import anchorClickHandler from 'utils/handle-anchor-link-click';

import EditDocLink from '../edit-doc-link';

const components = {
  h2: AnchorHeading('h2'),
  h3: AnchorHeading('h3'),
  // eslint-disable-next-line react/jsx-no-useless-fragment
  undefined: (props) => <Fragment {...props} />,
  code: (props) => {
    if (props?.className?.startsWith('language-')) {
      return <CodeBlock {...props} />;
    }
    return <code {...props} />;
  },
  pre: (props) => <div {...props} />,
  table: (props) => (
    <div className="table-wrapper">
      <table {...props} />
    </div>
  ),
  a: Anchor,
  Collapsible,
  Admonition,
  CodeTabs,
  CollapsibleItem,
  DefinitionList,
};

const Content = forwardRef(({ title, content, items, fileUrl }, ref) => (
  <div className="prose prose-base max-w-[800px] lg:max-w-full" ref={ref}>
    <h1 className="mb-3 font-mono text-5xl font-semibold leading-tight xl:text-3xl md:mb-4">
      {title}
    </h1>
    {items.length > 0 && (
      <nav className="hidden md:block">
        <CollapsibleItem title="On this page">
          <nav className="toc-list flex flex-col space-y-3 pt-4">
            {items.map(({ title }, index) => {
              const href = getIdFromChildren(title);

              return (
                <Link
                  className="font-mono text-sm font-semibold leading-tight text-grey-25 no-underline transition-colors duration-200"
                  to={`#${href}`}
                  key={index}
                  onClick={(e) => anchorClickHandler(e, href)}
                >
                  {title}
                </Link>
              );
            })}
          </nav>
        </CollapsibleItem>
      </nav>
    )}
    <MDXProvider components={components}>{content}</MDXProvider>
    <EditDocLink className="mt-8 hidden lg:inline-flex md:mt-1 sm:text-sm" to={fileUrl} />
  </div>
));

Content.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  fileUrl: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Content;
