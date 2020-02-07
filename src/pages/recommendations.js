import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Heading from '../components/UI/heading';
import styled from 'styled-components';

import { StyledSection } from '../layouts/elements';
import SEO from '../components/utils/seo';

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Recommendations = () => {
  // GRAPHQL Query
  const { recommendationsContent } = useStaticQuery(graphql`
    query {
      recommendationsContent: file(
        sourceInstanceName: { eq: "content" }
        extension: { eq: "md" }
        relativeDirectory: { regex: "/recommendations/" }
        name: { eq: "recommendations" }
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
        title="Recommendations"
        slug="/recommendations"
        description="You'll find different resources that I've used and recommend..."
      />
      <Heading
        title="Recommendations"
        subtitle="You'll find different <span>resources</span> that I've used and recommend..."
      />
      <ContentSection
        dangerouslySetInnerHTML={{
          __html: recommendationsContent.childMarkdownRemark.html
        }}
      />
    </StyledSection>
  );
};

export default Recommendations;
