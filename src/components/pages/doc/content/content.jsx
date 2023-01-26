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
};

const Content = forwardRef(({ title, content, fileUrl }, ref) => (
  <div className="prose prose-base max-w-[800px] lg:max-w-full" ref={ref}>
    <h1 className="mb-3 font-mono text-5xl font-semibold leading-tight xl:text-3xl">{title}</h1>
    <MDXProvider components={components}>{content}</MDXProvider>
    <EditDocLink className="mt-8 hidden lg:inline-flex md:mt-1 sm:text-sm" to={fileUrl} />
  </div>
));

Content.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  fileUrl: PropTypes.string.isRequired,
};

export default Content;
