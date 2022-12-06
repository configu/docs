import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const Admonition = ({ children, type, title }) => (
  <div
    className={clsx('admonition mt-8 rounded-r-[1px] border-l-2 px-5 pt-4 pb-2.5', {
      'note bg-admonition-note-light/8 border-admonition-note-light text-admonition-note-light dark:border-admonition-note-dark dark:bg-admonition-note-dark/16 dark:!text-admonition-note-dark':
        type === 'note',
      'warning bg-admonition-warning/8 border-admonition-warning text-admonition-warning dark:bg-admonition-warning/16':
        type === 'warning',
      'info bg-admonition-info/8 border-admonition-info text-admonition-info dark:bg-admonition-info/16':
        type === 'info',
      'caution bg-admonition-caution-light/8 border-admonition-caution-light text-admonition-caution-light dark:border-admonition-caution-dark dark:bg-admonition-caution-light/16 dark:!text-admonition-caution-dark':
        type === 'caution',
      'tip bg-admonition-tip-light/8 border-admonition-tip-light text-admonition-tip-light dark:border-admonition-tip-dark dark:bg-admonition-tip-light/16 dark:text-admonition-tip-dark':
        type === 'tip',
    })}
  >
    <span className="-mb-2.5 block text-xs font-bold uppercase">{title || type}</span>
    {children}
  </div>
);

Admonition.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['note', 'warning', 'info', 'caution', 'tip']),
  title: PropTypes.string,
};

Admonition.defaultProps = {
  children: null,
  type: 'note',
  title: null,
};

export default Admonition;
