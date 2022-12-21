/* eslint-disable react/prop-types */
import React from 'react';

import Layout from 'components/shared/layout';
import Link from 'components/shared/link/link';
import Search from 'components/shared/search';
import SEO from 'components/shared/seo';
import Icon404 from 'icons/icon-404.inline.svg';

// TODO: Add colors and font sizes, check out the reference — https://tailwindui.com/components/marketing/feedback/404-pages#component-5792f8fd3c3c2be236e72c170345a0ce
//       No need to change anything else. Only colors and font sizes
const NotFoundPage = () => (
  <Layout>
    <section className="safe-paddings py-32 lg:pt-28 md:pt-24 sm:pt-20 xs:py-16">
      <div className="container flex h-[100vh] flex-col items-center">
        <Icon404 className="dark:fill-blue dark:text-white sm:w-full" />
        <h1 className="mt-10 text-center font-mono text-[58px] font-bold leading-none dark:text-white md:text-[48px] sm:mt-5 sm:text-5xl">
          Ooops! Page not found...
        </h1>
        <p className="mt-4 max-w-[592px] text-center font-mono text-xl leading-tight dark:text-white xl:text-md sm:max-w-[480px] sm:text-base">
          Sorry, the page you are looking for doesn't seem to exist. Let's try again:
        </p>
        <Search
          className="mt-9 w-[400px] md:max-w-[350px] sm:w-full"
          inputClassName="min-h-[48px]"
          placeholderText="Search from other pages"
          searhIconSize="lg"
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
