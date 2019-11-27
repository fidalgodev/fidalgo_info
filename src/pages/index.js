import React, { useState, useRef, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import SetupTooltip from '../components/setupToolTip/Tooltip';
import useHandleClickOutsideRegions from '../components/utils/useHandleClickOutsideRegions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { StyledSection } from '../layouts/elements';
import Heading from '../components/UI/heading';

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 3rem;
`;

const StyledImg = styled(Img)`
  border-radius: 2px;
  box-shadow: 0 2rem 3rem var(--shadow-colorDark);
`;

const ItemInfo = styled.div`
  visibility: ${({ opened }) => (opened ? 'visible' : 'hidden')};
  opacity: ${({ opened }) => (opened ? 1 : 0)};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${({ opened }) =>
    opened ? ' translate(-50%, -50%)' : ' translate(-50%, -80%)'};
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

// Tooltip button and wrappers
const TooltipWrapper = styled.article`
  position: absolute;
  left: ${({ left }) => `${left}%`};
  top: ${({ top }) => `${top}%`};
  z-index: ${({ selected }) => (selected ? '1' : '0')};

  & .tooltipInnerWrapper {
    display: flex;
    height: 100%;
    width: 100%;
  }
`;

const Indicator = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background-color: var(--background);
  border: none;
  cursor: pointer;
  box-shadow: 0 2rem 3rem var(--shadow-colorDark);
  transition: background-color 200ms cubic-bezier(0.645, 0.045, 0.355, 1) & svg {
    height: 100%;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  transition: transform 200ms cubic-bezier(0.645, 0.045, 0.355, 1),
    color 200ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &.opened {
    transform: rotate(135deg);
  }
`;

const Article = styled.article`
  color: var(--text);
  max-width: 40rem;
  padding: 2rem;
  box-shadow: 0 2rem 3rem var(--shadow-color);
`;

const ItemTitle = styled.h1`
  color: var(--primary-light);
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const ItemDescription = styled.p`
  font-weight: 600;
  font-size: 1.7rem;
  margin-bottom: 1.25rem;
  color: var(--text-highlight);
`;

const ItemLink = styled.p`
  color: var(--text-highlight);
  font-weight: 800;
  font-size: 1.5rem;

  & a {
    color: var(--primary);
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

  const [selectedTooltip, setSelectedTooltip] = useState();
  const interestRegionRefs = useRef([]);

  // Create array of refs, we multiply by 2 because each item has a tooltip and a button and we want to store both refs on the array.
  // When we render the tooltip + button we save a ref of each other on the interestRegionRefs
  // Then the useHandleClickOutsideRegions will only run the action to close the tooltip if the click was outside the tooltip || button
  useEffect(() => {
    interestRegionRefs.current = [
      ...Array(homeItems.childMarkdownRemark.frontmatter.items.length * 2)
    ];
  }, [homeItems.childMarkdownRemark.frontmatter.items]);

  const handleTooltipBtnClicked = tooltip => {
    // If tooltip button clicked is the same as already opened, close the tooltip
    if (selectedTooltip === tooltip) {
      setSelectedTooltip(null);
      return;
    }
    // Otherwise open the respective one
    setSelectedTooltip(tooltip);
  };

  // Hook to check clicks on the body, if click is outside button or tooltip it calls the function on the 1st argument
  useHandleClickOutsideRegions(
    () => setSelectedTooltip(null),
    interestRegionRefs
  );

  return (
    <StyledSection fullHeight>
      <Heading
        title="setup"
        subtitle="Here you'll find both my <span>work</span> and <span>home</span> setup <span>details</span>..."
      />
      <ImageWrapper>
        <StyledImg fluid={homeSetup.childImageSharp.fluid} />
        {homeItems.childMarkdownRemark.frontmatter.items.map(
          ({ name, description, link, top, left }, i) => (
            <TooltipWrapper
              selected={selectedTooltip === i}
              key={i}
              top={top}
              left={left}
            >
              <SetupTooltip
                isOpened={selectedTooltip === i}
                closeTooltip={() => setSelectedTooltip(null)}
                anchor={
                  <Indicator
                    ref={ref => (interestRegionRefs.current[i * 2] = ref)}
                    onClick={() => handleTooltipBtnClicked(i)}
                  >
                    {selectedTooltip === i ? (
                      <StyledFontAwesomeIcon
                        icon={faPlus}
                        size="1x"
                        color="var(--red)"
                        className="opened"
                      />
                    ) : (
                      <StyledFontAwesomeIcon
                        icon={faPlus}
                        size="1x"
                        color="var(--text-highlight)"
                      />
                    )}
                  </Indicator>
                }
              >
                <Article
                  ref={ref => (interestRegionRefs.current[i * 2 + 1] = ref)}
                >
                  <ItemTitle>{name}</ItemTitle>
                  <ItemDescription>{description}</ItemDescription>
                  <ItemLink>
                    Get it{' '}
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      here
                    </a>
                  </ItemLink>
                </Article>
              </SetupTooltip>
            </TooltipWrapper>
          )
        )}
      </ImageWrapper>
    </StyledSection>
  );
};
export default IndexPage;
