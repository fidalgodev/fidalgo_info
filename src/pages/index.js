import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

import ReactTooltip from "react-tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faQuestion } from "@fortawesome/free-solid-svg-icons";

import { StyledSection } from "../layouts/elements";
import Heading from "../components/UI/heading";

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StyledImg = styled(Img)`
  border-radius: 2px;
  box-shadow: 0 2rem 3rem var(--shadow-colorDark);
`;

const Indicator = styled.button`
  position: absolute;
  left: ${({ left }) => `${left}%`};
  top: ${({ top }) => `${top}%`};
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

const ItemInfo = styled.div`
  visibility: ${({ opened }) => (opened ? "visible" : "hidden")};
  opacity: ${({ opened }) => (opened ? 1 : 0)};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${({ opened }) =>
    opened ? " translate(-50%, -50%)" : " translate(-50%, -80%)"};
  width: 100%;
  max-width: 40rem;
  z-index: 2;
  background-color: var(--background);
  border-radius: 2px;
  box-shadow: 0px 8px 15px var(--shadow-colorDark);
  transition: opacity 200ms ease-in-out,
    color 200ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s,
    background-color 200ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s,
    transform 200ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
`;

const ItemInfoWrapper = styled.section`
  position: relative;
  padding: 2rem 2rem;
  color: var(--text-highlight);
  text-align: left;

  & h1 {
    color: var(--primary-light);
    font-weight: 500;
    font-size: 2rem;
    margin: 0;
    margin-top: 1rem;
  }

  & p {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const SvgWrapper = styled.span`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

  const [selectedTooltips, setSelectedTooltips] = useState([]);

  console.log(selectedTooltips);

  // const handleTooltipClicked = tooltip => {
  //   console.log("tooltip clicked");

  //   if (selectedTooltip === tooltip) {
  //     setSelectedTooltip(null);
  //     return;
  //   }
  //   setSelectedTooltip(tooltip);
  // };

  const ItemIndicatorImage = ({ top, left, ...rest }) => (
    <Indicator type="button" top={top} left={left} {...rest}>
      <SvgWrapper>
        <FontAwesomeIcon
          color="var(--text-highlight)"
          size="1x"
          icon={faQuestion}
        />
      </SvgWrapper>
    </Indicator>
  );

  // const { name, description, link } =
  //   homeItems.childMarkdownRemark.frontmatter.items[selectedTooltip] || {};

  return (
    <StyledSection fullHeight>
      <Heading
        title="setup"
        subtitle="Here you'll find both my <span>work</span> and <span>home</span> setup <span>details</span>..."
      />
      <ImageWrapper>
        <StyledImg fluid={homeSetup.childImageSharp.fluid} />
        {homeItems.childMarkdownRemark.frontmatter.items.map(
          ({ top, left }, i) => (
            <>
              <ItemIndicatorImage
                key={i}
                top={top}
                left={left}
                data-id={i}
                data-tip="custom show"
                data-event="click"
                data-for="homeSetup"
              />
            </>
          )
        )}
        <ReactTooltip
          place="bottom"
          effect="solid"
          id="homeSetup"
          clickable={true}
          afterShow={e => {
            const itemId = e.target.closest("button").getAttribute("data-id");
            console.log(itemId);

            // setSelectedTooltips(prevState => [...prevState, itemId]);
          }}
          afterHide={e => {
            console.log(e);
          }}
          globalEventOff="click"
        />
      </ImageWrapper>
    </StyledSection>
  );
};
export default IndexPage;
