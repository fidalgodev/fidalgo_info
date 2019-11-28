import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import Img from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

import SetupTooltip from './setupToolTip/Tooltip';

// Styled components
import * as Styled from './styledComponents';

const ItemIndicator = React.forwardRef(
  ({ selected, id, onClick, title }, ref) => {
    // Animation
    const itemIndicatorAnimation = useTransition(selected, null, {
      from: { position: 'absolute', opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: config.gentle
    });

    return (
      <Styled.Indicator
        isOpened={selected}
        aria-describedby={selected ? id : null}
        title={title}
        ref={ref}
        onClick={onClick}
      >
        {itemIndicatorAnimation.map(({ item, key, props }) =>
          item ? (
            <animated.div key={key} style={props}>
              <FontAwesomeIcon icon={faTimes} size="1x" color="var(--red)" />
            </animated.div>
          ) : (
            <animated.div key={key} style={props}>
              <FontAwesomeIcon
                icon={faPlus}
                size="1x"
                color="var(--text-highlight)"
              />
            </animated.div>
          )
        )}
      </Styled.Indicator>
    );
  }
);

const SetupDetails = ({ image, items }) => {
  const [selectedTooltip, setSelectedTooltip] = useState(null);

  // Ref to the current tooltip opened button
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current && buttonRef.current.focus();
  }, [selectedTooltip]);

  return (
    <Styled.ImageWrapper>
      <Img fluid={image.childImageSharp.fluid} />
      {items.childMarkdownRemark.frontmatter.items.map(
        ({ name, description, link, top, left }, i) => {
          return (
            <Styled.TooltipWrapper
              selected={selectedTooltip === i}
              key={i}
              top={top}
              left={left}
            >
              {selectedTooltip === i ? (
                <SetupTooltip
                  isOpened={true}
                  id={`${name}${i}`}
                  closeTooltip={() => setSelectedTooltip(null)}
                  anchor={
                    <ItemIndicator
                      id={`${name}${i}`}
                      ref={buttonRef}
                      title={name}
                      selected={selectedTooltip === i}
                      onClick={() => setSelectedTooltip(null)}
                    />
                  }
                >
                  <Styled.Article>
                    <Styled.ItemTitle>{name}</Styled.ItemTitle>
                    <Styled.ItemDescription>
                      {description}
                    </Styled.ItemDescription>
                    <Styled.ItemLink>
                      Get it{' '}
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {' '}
                        here
                      </a>
                    </Styled.ItemLink>
                  </Styled.Article>
                </SetupTooltip>
              ) : (
                <ItemIndicator
                  id={`${name}${i}`}
                  title={name}
                  ref={buttonRef}
                  selected={selectedTooltip === i}
                  onClick={() => setSelectedTooltip(i)}
                />
              )}
            </Styled.TooltipWrapper>
          );
        }
      )}
    </Styled.ImageWrapper>
  );
};

export default SetupDetails;
