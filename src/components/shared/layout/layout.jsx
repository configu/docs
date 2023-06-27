import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { CookieConsent } from 'react-cookie-consent';

import Footer from 'components/shared/footer';
import Header from 'components/shared/header';
import Link from 'components/shared/link/link';
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
    to: '/',
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
        to: '/',
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
        <CookieConsent
          buttonText="Allow all"
          declineButtonText="Reject"
          containerClasses="fixed left-10 !bottom-10 z-[999] flex flex-nowrap items-center justify-center rounded-[6px] bg-white !bg-grey-98 px-6 pt-5 pb-9 font-sans shadow-modal dark:!bg-grey-25 sm:!bottom-4 sm:left-4 sm:right-4 sm:px-4 sm:pt-4 sm:pb-6 sm:justify-between"
          contentClasses="text-md leading-normal text-black dark:text-white lg:!mr-0 sm:text-sm [&>*]:mt-8 sm:[&>*]:mt-5"
          buttonWrapperClasses="absolute right-6 bottom-6 m-0 flex items-center gap-x-9 sm:right-4 sm:bottom-4 sm:gap-x-4"
          buttonClasses="bg-blue-light px-16 py-4 text-center text-base font-semibold leading-none !text-white outline-none transition-colors duration-200 hover:!bg-blue-light-hover dark:!bg-blue-dark dark:hover:!bg-blue-light sm:px-6 sm:py-3 sm:text-sm"
          declineButtonClasses="text-base transition-colors duration-200 text-grey-40 hover:text-blue-light-hover dark:hover:text-blue-light font-semibold leading-none dark:text-grey-80 sm:text-sm"
          enableDeclineButton
          disableStyles
        >
          This site uses cookies to measure and improve your experience.
          <p>
            <Link
              className="!text-base sm:!text-sm"
              to={`${process.env.GATSBY_CONFIGU_SITE_URL}privacy-policy`}
              theme="blue"
            >
              Privacy Policy
            </Link>
          </p>
        </CookieConsent>
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
