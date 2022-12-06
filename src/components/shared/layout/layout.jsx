import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

import Footer from 'components/shared/footer';
import Header from 'components/shared/header';
import MobileMenu from 'components/shared/mobile-menu';
import { ThemeContext, useDarkModeInit } from 'hooks/use-dark-mode';

const mainNavigation = [
  {
    text: 'Product',
    to: '//configu.io/product',
  },
  {
    text: 'Pricing',
    to: '//configu.io/pricing',
  },
  {
    text: 'Docs',
    to: '/',
  },
  {
    text: 'About Us',
    to: '//configu.io/about',
  },
];

const subNavigation = [
  {
    title: 'Configu',
    links: [
      {
        text: 'Home',
        to: '//configu.io/',
      },
      {
        text: 'Product',
        to: '//configu.io/product',
      },
      {
        text: 'About Us',
        to: '//configu.io/about',
      },
      {
        text: 'Status',
        to: 'https://status.configu.com',
      },
    ],
  },
  {
    title: 'Learn',
    links: [
      {
        text: 'Docs',
        to: '/',
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        text: 'Terms of Service',
        to: '//configu.io/terms-of-service',
      },
      {
        text: 'Privacy Policy',
        to: '//configu.io/privacy-policy',
      },
    ],
  },
];

const Layout = ({ children, headerTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useDarkModeInit();
  const themeContextValue = useMemo(() => [isDarkMode, setIsDarkMode], [isDarkMode, setIsDarkMode]);

  const handleHeaderBurgerClick = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className="flex min-h-screen flex-col">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          headerTheme={headerTheme}
          nav={mainNavigation}
          onBurgerClick={handleHeaderBurgerClick}
        />
        <main className="flex-grow dark:bg-grey-15">{children}</main>
        <Footer nav={subNavigation} />
        <MobileMenu isOpen={isMobileMenuOpen} items={mainNavigation} />
      </div>
    </ThemeContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  headerTheme: PropTypes.string,
};

Layout.defaultProps = {
  headerTheme: 'white',
};

export default Layout;

export const query = graphql`
  fragment wpPageSeo on WpPage {
    seo {
      title
      metaDesc
      metaKeywords
      metaRobotsNoindex
      opengraphTitle
      opengraphDescription
      opengraphUrl
      opengraphImage {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1200, height: 630, formats: JPG)
          }
        }
      }
    }
  }

  fragment wpPostSeo on WpPost {
    seo {
      title
      metaDesc
      metaKeywords
      metaRobotsNoindex
      opengraphTitle
      opengraphDescription
      opengraphUrl
      opengraphImage {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1200, height: 630, formats: JPG)
          }
        }
      }
    }
  }
`;
