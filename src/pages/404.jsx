/* eslint-disable react/prop-types */
import React from 'react';

import Layout from 'components/shared/layout';
import Link from 'components/shared/link/link';
import Search from 'components/shared/search';
import SEO from 'components/shared/seo';
import Icon404 from 'icons/icon-404.inline.svg';

// TODO: Add colors and font sizes, check out the reference — https://tailwindui.com/components/marketing/feedback/404-pages#component-5792f8fd3c3c2be236e72c170345a0ce
//       No need to change anything else. Only colors and font sizes

const AdditionalResultStyles = 'max-h-[30vh] lg:max-h-[26vh] md:max-h-[26vh] sm:max-h-[22vh]';

const NotFoundPage = () => (
  <Layout>
    <section className="safe-paddings">
      <div className="container flex h-[calc(100vh-80px)] flex-col items-center justify-center md:h-[calc(100vh-72px)]">
        <Icon404 className="-mt-16 max-h-fit stroke-blue-light stroke-0 dark:stroke-blue-dark dark:text-white sm:w-full" />
        <h1 className="mt-20 text-center font-mono text-[58px] font-bold leading-none dark:text-white md:mt-12 md:text-[48px] sm:mt-16 sm:text-5xl">
          Ooops! Page not found...
        </h1>
        <p className="mt-4 max-w-[592px] text-center font-mono text-xl leading-tight dark:text-white xl:text-md sm:max-w-[480px] sm:text-base">
          Sorry, the page you are looking for doesn't seem to exist. Let's try again:
        </p>
        <Search
          className="mt-9 w-[400px] md:mt-7 md:max-w-[350px] sm:w-full"
          inputClassName="min-h-[48px]"
          placeholderText="Search from other pages"
          searhIconSize="lg"
          additionalResultsStyles={AdditionalResultStyles}
        />
        <Link className="mt-8 text-lg" size="xl" theme="black-underlined" to="/">
          Back to Home
        </Link>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;

export const Head = ({ location: { pathname } }) => <SEO pathname={pathname} />;
