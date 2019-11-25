import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faQuestion } from "@fortawesome/free-solid-svg-icons";

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

const IndicatorWrapper = styled.article`
  position: absolute;
  top: ${({ top }) => `${top}%`};
  left: ${({ left }) => `${left}%`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Indicator = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: 100%;
  background-color: var(--background);
  border: none;
  cursor: pointer;
  box-shadow: 0 2rem 3rem var(--shadow-colorDark);

  & svg {
    height: 100%;
  }
`;

const Tooltip = styled.span`
  visibility: ${({ opened }) => (opened ? "visible" : "hidden")};
  opacity: ${({ opened }) => (opened ? 1 : 0)};
  width: 14rem;
  margin-left: -7rem;
  font-weight: 600;
  font-size: 1.3rem;
  background-color: var(--background);
  color: var(--text-highlight);
  text-align: center;
  border-radius: 6px;
  padding: 1rem;
  position: absolute;
  z-index: 2;
  bottom: 140%;
  left: 50%;
  transition: opacity 200ms ease-in-out, visibility 200ms ease-in-out,
    color 200ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s,
    background-color 200ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    transition: border-color 200ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
    border-color: var(--background) transparent transparent transparent;
  }
`;

const ItemIndicatorButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: var(--text);
  font-weight: 500;
  font-size: 1.5rem;
  outline: none;
  border: none;
  cursor: pointer;

  & svg {
    margin-right: 0.5rem;
  }
`;

const ItemIndicatorImage = ({ name, top, left, onClick, selected }) => (
  <IndicatorWrapper left={left} top={top}>
    <Indicator onClick={onClick}>
      {selected ? (
        <FontAwesomeIcon
          color="var(--text-highlight)"
          size="1x"
          icon={faTimes}
        />
      ) : (
        <FontAwesomeIcon
          color="var(--text-highlight)"
          size="1x"
          icon={faQuestion}
        />
      )}
    </Indicator>
    <Tooltip opened={selected}>{name}</Tooltip>
  </IndicatorWrapper>
);

const ItemIndicator = ({ onClick, selected, children }) => (
  <ItemIndicatorButton onClick={onClick} selected={selected}>
    {selected ? (
      <FontAwesomeIcon color="var(--text-highlight)" size="1x" icon={faTimes} />
    ) : (
      <FontAwesomeIcon
        color="var(--text-highlight)"
        size="1x"
        icon={faQuestion}
      />
    )}
    {children}
  </ItemIndicatorButton>
);

const IndexPage = () => {
  // GRAPHQL Query
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

  const [selectedTooltip, setSelectedTooltip] = useState(null);

  console.log(selectedTooltip);

  const handleTooltipClicked = tooltip => {
    if (selectedTooltip === tooltip) {
      setSelectedTooltip(null);
      return;
    }
    setSelectedTooltip(tooltip);
  };

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
            <ItemIndicatorImage
              key={i}
              type="button"
              onClick={() => handleTooltipClicked(i)}
              selected={selectedTooltip === i}
              top={top}
              left={left}
              name={name}
            />
          )
        )}
      </ImageWrapper>
      {homeItems.childMarkdownRemark.frontmatter.items.map(({ name }, i) => (
        <ItemIndicator
          key={i}
          type="button"
          onClick={() => handleTooltipClicked(i)}
          selected={selectedTooltip === i}
        >
          {name}
        </ItemIndicator>
      ))}
    </StyledSection>
  );
};
export default IndexPage;
