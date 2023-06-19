import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import CodeBlock from 'components/shared/code-block';

const CodeTabs = ({ children, labels }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="code-group my-5 max-w-full overflow-hidden rounded-md bg-grey-15 dark:bg-grey-25">
      <div className="no-scrollbars flex w-full flex-nowrap overflow-auto border-b border-grey-25 bg-grey-15 text-grey-50 dark:border-grey-40 dark:bg-grey-25 dark:text-grey-60">
        {labels.map((label, i) => (
          <div
            key={`lb-${i}`}
            className={clsx(
              'after:trasition-opacity cursor-pointer whitespace-nowrap px-5 pb-0 pt-3 font-mono font-semibold transition-colors duration-200 after:mt-0.5 after:block after:w-full after:border-b-2 after:opacity-0 after:duration-100',
              i === currentIndex ? 'text-white after:opacity-100' : ''
            )}
            tabIndex="0"
            role="button"
            onClick={() => setCurrentIndex(i)}
            onKeyDown={() => setCurrentIndex(i)}
          >
            {label}
          </div>
        ))}
      </div>
      <div className={`$'{styles.itemsContainer}'`}>
        {React.Children.map(children, (child, i) => {
          if (i !== currentIndex) {
            return null;
          }

          const { children, className } = child.props?.children.props ?? {};

          return (
            <CodeBlock key={i} className={className} showLineNumbers>
              {children}
            </CodeBlock>
          );
        })}
      </div>
    </div>
  );
};

CodeTabs.propTypes = {
  children: PropTypes.node,
  labels: PropTypes.arrayOf(PropTypes.string),
};

CodeTabs.defaultProps = {
  children: null,
  labels: [],
};

export default CodeTabs;
