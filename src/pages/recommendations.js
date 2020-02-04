import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Heading from '../components/UI/heading';

import { StyledSection } from '../layouts/elements';
import RecommendationBlock from '../components/recommendations/RecomendationBlock';

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
          frontmatter {
            recommendations {
              name
              resources {
                title
                link
              }
            }
          }
        }
      }
    }
  `);

  return (
    <StyledSection>
      <Heading
        title="Recommendations"
        subtitle="You'll find different <span>resources</span> that I've used and recommend..."
      />
      {recommendationsContent.childMarkdownRemark.frontmatter.recommendations.map(
        ({ name, resources }) => (
          <RecommendationBlock key={name} title={name}>
            {resources}
          </RecommendationBlock>
        )
      )}
    </StyledSection>
  );
};

export default Recommendations;
