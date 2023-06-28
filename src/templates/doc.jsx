/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React, { useRef } from 'react';

import Content from 'components/pages/doc/content';
import Navigation from 'components/pages/doc/navigation';
import Sidebar from 'components/pages/doc/sidebar';
import TableOfContents from 'components/pages/doc/table-of-contents';
import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';
import SEO_DATA from 'constants/seo-data';

const DocTemplate = (props) => {
  const {
    data: {
      mdx: { frontmatter },
    },
    children,
    pageContext: { sidebar, previousLink, nextLink, tableOfContents, fileOriginPath },
  } = props;

  const contentRef = useRef(null);

  return (
    <Layout>
      <div className="border-b border-t border-grey-88 dark:border-grey-40 md:border-t-0 md:border-b-0">
        <div className="container grid w-full grid-cols-[300px_1fr_300px] px-0 xl:px-10 lg:grid-cols-[300px_1fr] md:flex md:flex-col md:px-7 sm:px-4">
          <Sidebar sidebar={sidebar} currentSlug={frontmatter.slug} />

          <div className="overflow-hidden border-l border-r border-grey-88 px-9 pb-20 pt-7 dark:border-grey-40 lg:border-r-0 lg:pr-0 md:border-l-0 md:pl-0">
            <Content
              title={frontmatter.title}
              content={children}
              fileUrl={fileOriginPath}
              ref={contentRef}
              items={tableOfContents || []}
            />
            <Navigation previousLink={previousLink} nextLink={nextLink} />
          </div>

          <TableOfContents
            items={tableOfContents || []}
            contentRef={contentRef}
            fileUrl={fileOriginPath}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DocTemplate;

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      excerpt
      frontmatter {
        title
        slug
      }
    }
  }
`;

export const Head = ({
  location: { pathname },
  data: {
    mdx: {
      excerpt,
      frontmatter: { title },
    },
  },
}) => <SEO pathname={pathname} {...SEO_DATA.doc({ title, description: excerpt })} />;
