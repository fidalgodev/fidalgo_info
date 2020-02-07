import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../components/utils/seo';
import styled from 'styled-components';

import Heading from '../components/UI/heading';
import { StyledSection } from '../layouts/elements';

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Uses = () => {
  const { usesContent } = useStaticQuery(graphql`
    query {
      usesContent: file(
        sourceInstanceName: { eq: "content" }
        extension: { eq: "md" }
        relativeDirectory: { regex: "/uses/" }
        name: { eq: "uses" }
      ) {
        childMarkdownRemark {
          html
        }
      }
    }
  `);

  return (
    <StyledSection>
      <SEO
        title="Uses"
        slug="/uses"
        description="Here you'll find everything that I use 😅...
"
      />
      <Heading
        title="Uses"
        subtitle="Here you'll find <span>everything</span> that I use 😅..."
      />
      <ContentSection
        dangerouslySetInnerHTML={{
          __html: usesContent.childMarkdownRemark.html
        }}
      />
    </StyledSection>
  );
};

export default Uses;
