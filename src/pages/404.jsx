/* eslint-disable react/prop-types */
import React from 'react';

import Button from 'components/shared/button/button';
import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';
import Icon404 from 'icons/icon-404.inline.svg';

// TODO: Add colors and font sizes, check out the reference — https://tailwindui.com/components/marketing/feedback/404-pages#component-5792f8fd3c3c2be236e72c170345a0ce
//       No need to change anything else. Only colors and font sizes
const NotFoundPage = () => (
  <Layout>
    <section className="safe-paddings py-52 lg:py-44 md:py-36 sm:py-28 xs:py-10">
      <div className="container flex flex-col items-center">
        <Icon404 className="dark:fill-blue dark:text-white sm:w-full" />
        <h1 className="mt-10 text-center font-mono text-[58px] font-bold leading-none dark:text-white md:text-[48px] sm:mt-5 sm:text-5xl">
          Ooops! Page not found...
        </h1>
        <p className="mt-4 max-w-[592px] text-center font-mono text-xl leading-tight dark:text-white xl:text-md sm:max-w-[480px] sm:text-base">
          Sorry, the page you are looking for doesn’t exist or has been moved. We suggest you back
          to home.
        </p>
        <Button className="mt-9" size="md" theme="blue" type="button" to="/">
          Back to Home
        </Button>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;

export const Head = ({ location: { pathname } }) => <SEO pathname={pathname} />;
