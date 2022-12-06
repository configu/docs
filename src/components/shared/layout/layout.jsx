import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

import Footer from 'components/shared/footer';
import Header from 'components/shared/header';
import MobileMenu from 'components/shared/mobile-menu';
import { ThemeContext, useDarkModeInit } from 'hooks/use-dark-mode';

const navItems = [
  {
    text: 'Product',
    to: '/product',
  },
  {
    text: 'Pricing',
    to: '/pricing',
  },
  {
    text: 'Docs',
    to: '/docs',
  },
  // {
  //   text: 'Blog',
  //   to: '/blog',
  // },
  {
    text: 'About Us',
    to: '/about',
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
          items={navItems}
          onBurgerClick={handleHeaderBurgerClick}
        />
        <main className="flex-grow dark:bg-grey-15">{children}</main>
        <Footer />
        <MobileMenu isOpen={isMobileMenuOpen} items={navItems} />
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
