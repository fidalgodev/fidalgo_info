import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import SetupDetails from '../components/setupDetails/SetupDetails';

import { StyledSection } from '../layouts/elements';
import Heading from '../components/UI/heading';
import BackgroundHeading from '../components/UI/backgroundHeading';

const IndexPage = () => {
  // GRAPHQL Query
  const { homeSetup, homeItems, workItems } = useStaticQuery(graphql`
    query {
      homeSetup: file(relativePath: { eq: "setup_home.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 2000, quality: 95) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      homeItems: file(
        sourceInstanceName: { eq: "content" }
        extension: { eq: "md" }
        relativeDirectory: { regex: "/setup/" }
        name: { eq: "homeItems" }
      ) {
        childMarkdownRemark {
          frontmatter {
            items {
              name
              description
              link
              top
              left
            }
          }
        }
      }
      workItems: file(
        sourceInstanceName: { eq: "content" }
        extension: { eq: "md" }
        relativeDirectory: { regex: "/setup/" }
        name: { eq: "workItems" }
      ) {
        childMarkdownRemark {
          frontmatter {
            items {
              name
              description
              link
              top
              left
            }
          }
        }
      }
    }
  `);

  return (
    <StyledSection>
      <Heading
        title="setup"
        subtitle="Here you'll find both my <span>work</span> and <span>home</span> setup <span>details</span>..."
      />
      <BackgroundHeading>Home Setup</BackgroundHeading>
      <SetupDetails image={homeSetup} items={homeItems} />
      <BackgroundHeading>Work Setup</BackgroundHeading>
      <SetupDetails image={homeSetup} items={workItems} />
    </StyledSection>
  );
};

export default IndexPage;
