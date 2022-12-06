import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import Burger from 'components/shared/burger';
import Link from 'components/shared/link';
import Logo from 'images/logo.inline.svg';

const headerStyles = {
  white: {
    background: 'bg-white dark:bg-grey-15',
    logo: 'text-black dark:text-white',
    menu: 'black',
    cta: 'black-underlined',
    burger: 'text-black dark:text-white',
  },
  grey: {
    background: 'bg-grey-96 dark:bg-grey-25',
    logo: 'text-black dark:text-white',
    menu: 'black',
    cta: 'black-underlined',
    burger: 'text-black dark:text-white',
  },
  blue: {
    background: 'bg-blue-light dark:bg-blue-dark',
    logo: 'text-white',
    menu: 'white-underlined-motion',
    cta: 'white-underlined',
    burger: 'text-white',
    border: 'bg-white dark:bg-white',
  },
};

const Header = ({ isMobileMenuOpen, onBurgerClick, headerTheme, items }) => (
  <header className={clsx('header safe-paddings', headerStyles[headerTheme].background)}>
    <div className="container-lg flex h-20 items-center justify-end xl:px-10 md:h-[72px] md:px-7 sm:px-4 sm:pb-4">
      <Link to="/" className="z-50 mr-auto h-6">
        <span className="sr-only">Configu</span>
        <Logo
          className={clsx(
            'h-6',
            isMobileMenuOpen ? 'text-black dark:text-white' : headerStyles[headerTheme].logo
          )}
        />
      </Link>

      <nav className="flex items-center space-x-8 leading-none md:hidden">
        <ul className="flex space-x-10">
          {items.map(({ text, to }, index) => (
            <li key={index}>
              <Link to={to} size="sm" theme={headerStyles[headerTheme].menu}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
        <span
          className={clsx(
            'h-7 w-px xl:h-6',
            headerStyles[headerTheme]?.border
              ? headerStyles[headerTheme].border
              : 'bg-grey-88 dark:bg-grey-40'
          )}
        />
        <Link
          to={process.env.GATSBY_CONFIGU_APP_URL}
          size="sm"
          theme={headerStyles[headerTheme].menu}
        >
          Login
        </Link>
        <Link
          to={process.env.GATSBY_CONFIGU_APP_URL}
          size="sm"
          theme={headerStyles[headerTheme].cta}
        >
          Get it free
        </Link>
      </nav>

      <Burger
        className={clsx(
          'z-50 hidden md:block',
          isMobileMenuOpen ? 'text-black dark:text-white' : headerStyles[headerTheme]?.burger
        )}
        isToggled={isMobileMenuOpen}
        onClick={onBurgerClick}
      />
    </div>
  </header>
);

Header.propTypes = {
  isMobileMenuOpen: PropTypes.bool,
  headerTheme: PropTypes.oneOf(Object.keys(headerStyles)).isRequired,
  onBurgerClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Header.defaultProps = {
  isMobileMenuOpen: false,
};

export default Header;
