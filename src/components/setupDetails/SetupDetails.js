import React, { useState, useRef, useEffect } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import useHandleClickOutsideRegions from '../../components/utils/useHandleClickOutsideRegions';
import SetupTooltip from './setupToolTip/Tooltip';

// Styled components
import * as Styled from './styledComponents';

const SetupDetails = ({ image, items }) => {
  const [selectedTooltip, setSelectedTooltip] = useState(null);
  const interestRegionRefs = useRef([]);

  // Create array of refs, we multiply by 2 because each item has a tooltip and a button and we want to store both refs on the array.
  // When we render the tooltip + button we save a ref of each other on the interestRegionRefs
  // Then the useHandleClickOutsideRegions will only run the action to close the tooltip if the click was outside the tooltip || button
  useEffect(() => {
    interestRegionRefs.current = [
      ...Array(items.childMarkdownRemark.frontmatter.items.length * 2)
    ];
  }, [items.childMarkdownRemark.frontmatter.items]);

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
    <Styled.ImageWrapper>
      <Styled.StyledImg fluid={image.childImageSharp.fluid} />
      {items.childMarkdownRemark.frontmatter.items.map(
        ({ name, description, link, top, left }, i) => (
          <Styled.TooltipWrapper
            selected={selectedTooltip === i}
            key={i}
            top={top}
            left={left}
          >
            <SetupTooltip
              isOpened={selectedTooltip === i}
              closeTooltip={() => setSelectedTooltip(null)}
              anchor={
                <Styled.Indicator
                  aria-describedby={`${name}${i}`}
                  ref={ref => (interestRegionRefs.current[i * 2] = ref)}
                  onClick={() => handleTooltipBtnClicked(i)}
                >
                  {selectedTooltip === i ? (
                    <Styled.StyledFontAwesomeIcon
                      icon={faPlus}
                      size="1x"
                      color="var(--red)"
                      className="opened"
                    />
                  ) : (
                    <Styled.StyledFontAwesomeIcon
                      icon={faPlus}
                      size="1x"
                      color="var(--text-highlight)"
                    />
                  )}
                </Styled.Indicator>
              }
            >
              <Styled.Article
                id={`${name}${i}`}
                role="tooltip"
                ref={ref => (interestRegionRefs.current[i * 2 + 1] = ref)}
              >
                <Styled.ItemTitle>{name}</Styled.ItemTitle>
                <Styled.ItemDescription>{description}</Styled.ItemDescription>
                <Styled.ItemLink>
                  Get it{' '}
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    here
                  </a>
                </Styled.ItemLink>
              </Styled.Article>
            </SetupTooltip>
          </Styled.TooltipWrapper>
        )
      )}
    </Styled.ImageWrapper>
  );
};

export default SetupDetails;
