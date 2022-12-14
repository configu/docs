import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

import HotkeysDarkIcon from './images/hotkeys-dark.inline.svg';
import HotkeysLightIcon from './images/hotkeys-light.inline.svg';
import SearchIconLg from './images/search-lg.inline.svg';
import SearchIcon from './images/search.inline.svg';

const Input = connectSearchBox(
  ({
    refine,
    currentRefinement,
    onFocus,
    hasFocus,
    additionalClassName,
    placeholder,
    iconSize,
  }) => {
    const Placeholder = placeholder || 'Search';

    return (
      <div className="relative">
        {iconSize === 'lg' && (
          <SearchIconLg className="absolute top-1/2 left-2.5 -translate-y-1/2 dark:text-grey-60" />
        )}
        {iconSize === 'md' ||
          (iconSize === null && (
            <SearchIcon className="absolute top-1/2 left-2.5 -translate-y-1/2 dark:text-grey-60" />
          ))}
        <input
          id="search-input"
          className={clsx(
            'search-input h-8 w-full appearance-none rounded border border-grey-80 bg-white pl-9 pr-2.5 font-mono text-base text-black placeholder-grey-25 outline-none dark:border-grey-40 dark:bg-grey-15 dark:text-white dark:placeholder-grey-40',
            hasFocus && currentRefinement && 'rounded-b-none',
            additionalClassName
          )}
          type="search"
          value={currentRefinement}
          placeholder={Placeholder}
          autoComplete="off"
          aria-label="Search"
          onChange={(e) => refine(e.target.value)}
          onFocus={onFocus}
        />
        <HotkeysDarkIcon
          className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 dark:block md:dark:hidden"
          aria-hidden
        />
        <HotkeysLightIcon
          className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 dark:hidden md:hidden "
          aria-hidden
        />
      </div>
    );
  }
);

Input.propTypes = {
  refine: PropTypes.func,
  currentRefinement: PropTypes.string,
  additionalClassName: PropTypes.string,
  placeholder: PropTypes.string,
  iconSize: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  hasFocus: PropTypes.bool,
};

Input.defaultProps = {
  refine: () => null,
  currentRefinement: null,
  hasFocus: false,
  iconSize: 'md',
};

export default Input;
