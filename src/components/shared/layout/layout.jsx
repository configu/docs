import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { CookiesProvider } from 'react-cookie';

import Footer from 'components/shared/footer';
import Header from 'components/shared/header';
import MobileMenu from 'components/shared/mobile-menu';
import { ThemeContext, useDarkModeInit } from 'hooks/use-dark-mode';

const mainNavigation = [
  {
    text: 'Product',
    to: `${process.env.GATSBY_CONFIGU_SITE_URL}product`,
  },
  {
    text: 'Pricing',
    to: `${process.env.GATSBY_CONFIGU_SITE_URL}pricing`,
  },
  {
    text: 'Docs',
    to: process.env.GATSBY_CONFIGU_DOCS_URL,
  },
  {
    text: 'About Us',
    to: `${process.env.GATSBY_CONFIGU_SITE_URL}about`,
  },
];

const subNavigation = [
  {
    title: 'Configu',
    links: [
      {
        text: 'Home',
        to: process.env.GATSBY_CONFIGU_SITE_URL,
      },
      {
        text: 'Product',
        to: `${process.env.GATSBY_CONFIGU_SITE_URL}product`,
      },
      {
        text: 'About Us',
        to: `${process.env.GATSBY_CONFIGU_SITE_URL}about`,
      },
      {
        text: 'Status',
        to: process.env.GATSBY_CONFIGU_STATUS_URL,
      },
    ],
  },
  {
    title: 'Learn',
    links: [
      {
        text: 'Docs',
        to: process.env.GATSBY_CONFIGU_DOCS_URL,
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        text: 'Terms of Service',
        to: `${process.env.GATSBY_CONFIGU_SITE_URL}terms-of-service`,
      },
      {
        text: 'Privacy Policy',
        to: `${process.env.GATSBY_CONFIGU_SITE_URL}privacy-policy`,
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
    <CookiesProvider>
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
    </CookiesProvider>
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
