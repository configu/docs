import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import Button from 'components/shared/button';
import useCopyToClipboard from 'hooks/use-copy-to-clipboard';
import Copy from 'icons/copy.inline.svg';
import Copied from 'icons/tick.inline.svg';

const DEFAULT_LANGUAGE = 'bash';

const CodeBlock = ({ className, children, showLineNumbers, language, ...otherProps }) => {
  const { isCopied, handleCopy } = useCopyToClipboard(3000);

  const match = /language-(\w+)/.exec(className || '');
  const matchLanguage = match ? match[1] : DEFAULT_LANGUAGE;
  const code = children.trim();

  return (
    <div className="group relative" {...otherProps}>
      <SyntaxHighlighter
        className="no-scrollbars"
        language={language || matchLanguage}
        useInlineStyles={false}
        showLineNumbers={showLineNumbers}
      >
        {code}
      </SyntaxHighlighter>
      <Button
        className={clsx(
          'invisible absolute top-3 right-3',
          isCopied && 'pointer-events-none text-white'
        )}
        type="button"
        disabled={isCopied}
        size="xs"
        theme="code-copy"
        onClick={() => handleCopy(code)}
      >
        {isCopied ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Copied className="h-[15px] w-[15px]" />
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring' }}
            >
              <Copy />
            </motion.div>
          </AnimatePresence>
        )}
      </Button>
    </div>
  );
};

CodeBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  showLineNumbers: PropTypes.bool,
  language: PropTypes.string,
};

CodeBlock.defaultProps = {
  className: null,
  showLineNumbers: false,
  language: null,
};

export default CodeBlock;
