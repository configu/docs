import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import React, { forwardRef, Fragment } from 'react';

import Admonition from 'components/shared/admonition';
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
  Collapsible,
  Admonition,
  CodeTabs,
  CollapsibleItem,
};

const Content = forwardRef(({ title, content, fileUrl }, ref) => (
  <div className="prose prose-base max-w-[800px] lg:max-w-full" ref={ref}>
    <h1 className="mb-3 flex font-mono text-5xl font-semibold leading-tight xl:text-3xl md:text-xl sm:flex-col-reverse sm:text-lg">
      {title}
      <EditDocLink
        className="ml-auto pl-4 pt-3 hover:border-blue-light-hover dark:hover:border-blue-light lg:inline-flex md:pt-2 sm:ml-0 sm:mb-4 sm:w-full sm:justify-center sm:rounded sm:border sm:border-blue-light sm:p-2 dark:sm:border-blue-dark"
        to={fileUrl}
      />
    </h1>
    <MDXProvider components={components}>{content}</MDXProvider>
  </div>
));

Content.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  fileUrl: PropTypes.string.isRequired,
};

export default Content;
