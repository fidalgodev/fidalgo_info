import React, { useState, useRef, useEffect } from 'react';
import Img from 'gatsby-image';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import useHandleClickOutsideRegion from '../utils/useHandleClickOutsideRegion';
import SetupTooltip from './setupToolTip/Tooltip';
// import ItemIndicator from './itemIndicator/ItemIndicator';
import { Indicator, StatusIcon } from './styledComponents';

// Styled components
import {
  ImageWrapper,
  TooltipWrapper,
  TooltipContentWrapper,
  ItemTitle,
  ItemDescription,
  ItemLink
} from './styledComponents';

const SetupDetails = ({ image, items }) => {
  const [selectedTooltip, setSelectedTooltip] = useState(null);
  const tooltipRefs = useRef([]);

  // Hook to check clicks on the body, if click is outside button or tooltip it calls the function on the 1st argument
  useHandleClickOutsideRegion(() => setSelectedTooltip(null), tooltipRefs);

  const handleTooltipClick = tooltip => {
    if (tooltip === selectedTooltip) {
      setSelectedTooltip(null);
      return;
    }
    setSelectedTooltip(tooltip);
  };

  useEffect(() => {
    tooltipRefs.current = [
      ...Array(items.childMarkdownRemark.frontmatter.items.length * 2)
    ];
  }, [items.childMarkdownRemark.frontmatter.items]);

  return (
    <ImageWrapper>
      <Img fluid={image.childImageSharp.fluid} />
      {items.childMarkdownRemark.frontmatter.items.map(
        ({ name, description, link, top, left }, i) => {
          const opened = selectedTooltip === i;

          return (
            <TooltipWrapper selected={opened} key={i} top={top} left={left}>
              <SetupTooltip
                isOpened={opened}
                id={`${name}${i}`}
                closeTooltip={() => setSelectedTooltip(null)}
                anchor={
                  <Indicator
                    aria-describedby={`${name}${i}`}
                    title={name}
                    ref={ref => (tooltipRefs.current[i * 2] = ref)}
                    onClick={() => handleTooltipClick(i)}
                  >
                    <StatusIcon
                      icon={faPlus}
                      size="1x"
                      opened={opened ? 1 : 0}
                      color={opened ? 'var(--red)' : 'var(--text-highlight)'}
                    />
                  </Indicator>
                }
              >
                <TooltipContentWrapper
                  ref={ref => (tooltipRefs.current[i * 2 + 1] = ref)}
                >
                  <ItemTitle>{name}</ItemTitle>
                  <ItemDescription>{description}</ItemDescription>
                  <ItemLink>
                    Get it{' '}
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {' '}
                      here
                    </a>
                  </ItemLink>
                </TooltipContentWrapper>
              </SetupTooltip>
            </TooltipWrapper>
          );
        }
      )}
    </ImageWrapper>
  );
};

export default SetupDetails;
