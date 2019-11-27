import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import SetupDetails from '../components/setupDetails/SetupDetails';

import { StyledSection } from '../layouts/elements';
import Heading from '../components/UI/heading';

const SetupHeading = styled.h2`
  font-weight: 600;
  font-size: 2rem;
  z-index: 1;
  position: relative;
  font-style: italic;
  margin: 0;
  margin-bottom: 3.5rem;
  color: var(--white);
  transition: color 0.2s ease-out;

  @media ${props => props.theme.mediaQueries.small} {
    margin-bottom: 2rem;
  }

  @media ${props => props.theme.mediaQueries.smallest} {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  &:after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: rotate(-2deg);
    background: var(--primary);
  }
`;

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
    <StyledSection fullHeight>
      <Heading
        title="setup"
        subtitle="Here you'll find both my <span>work</span> and <span>home</span> setup <span>details</span>..."
      />
      <SetupHeading>Home Setup</SetupHeading>
      <SetupDetails image={homeSetup} items={homeItems} />
      <SetupHeading>Work Setup</SetupHeading>
      <SetupDetails image={homeSetup} items={workItems} />
    </StyledSection>
  );
};

export default IndexPage;
