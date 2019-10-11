import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

import { StyledSection } from "../layouts/elements";
import Heading from "../components/UI/heading";

const ImageWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
`;

const StyledImg = styled(Img)`
  border-radius: 2px;
  box-shadow: 0 2rem 3rem var(--shadow-colorDark);
`;

const IndicatorWrapper = styled.div`
  position: absolute;
  top: ${({ top }) => `${top}%`};
  left: ${({ left }) => `${left}%`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Indicator = styled.button`
  width: 2rem;
  height: 2rem;
  padding: 0;
  border-radius: 100%;
  background-color: var(--white);
  border: none;
  cursor: pointer;
`;

const Tooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  width: 120px;
  font-size: 1.2rem;
  background-color: var(--white);
  color: var(--text);
  text-align: center;
  border-radius: 6px;
  padding: 1rem;
  position: absolute;
  z-index: 2;
  bottom: 140%;
  left: 50%;
  margin-left: -60px;
  transition: all 200ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    transition: all 200ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
    border-color: var(--white) transparent transparent transparent;
  }

  ${IndicatorWrapper}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const ItemIndicator = ({ name, top, left }) => (
  <IndicatorWrapper left={left} top={top}>
    <Indicator />
    <Tooltip>{name}</Tooltip>
  </IndicatorWrapper>
);

const IndexPage = () => {
  const { homeSetup, homeItems, workItems } = useStaticQuery(graphql`
    query {
      homeSetup: file(relativePath: { eq: "setup_home.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1250, quality: 80) {
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
      <ImageWrapper>
        <StyledImg fluid={homeSetup.childImageSharp.fluid} />
        {homeItems.childMarkdownRemark.frontmatter.items.map(
          ({ name, top, left }, i) => (
            <ItemIndicator
              key={i}
              type="button"
              top={top}
              left={left}
              name={name}
            />
          )
        )}
      </ImageWrapper>
    </StyledSection>
  );
};
export default IndexPage;
