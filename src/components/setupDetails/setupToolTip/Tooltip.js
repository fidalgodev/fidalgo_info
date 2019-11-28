import React, { useRef } from 'react';
import Tooltip from 'react-tooltip-lite';
import { useSpring, animated, config } from 'react-spring';

import useHandleClickOutsideRegion from '../../utils/useHandleClickOutsideRegion';
import useWidthChanged from './useWidthChanged';

const SetupTooltip = ({ id, isOpened, closeTooltip, anchor, children }) => {
  const tooltipRef = useRef(null);
  const width = useWidthChanged();

  // Hook to check clicks on the body, if click is outside button or tooltip it calls the function on the 1st argument
  useHandleClickOutsideRegion(closeTooltip, tooltipRef);

  // TODO: replace with transition
  // const tooltipAnimation = useSpring({
  //   opacity: isOpened ? '1' : '0',
  //   transform: `translateY(${isOpened ? '0rem' : '2rem'})`,
  //   config: config.gentle
  // });

  return (
    <Tooltip
      key={`${width}`}
      isOpen={true}
      tagName="div"
      className="tooltipInnerWrapper"
      tipContentClassName="tooltipContent"
      background="var(--tooltipBackground)"
      direction="down"
      arrowSize={7}
      distance={10}
      padding="0"
      content={
        <animated.article
          id={id}
          ref={tooltipRef}
          role="tooltip"
          aria-live="polite"
          aria-hidden={false}
          // style={tooltipAnimation}
        >
          {children}
        </animated.article>
      }
    >
      {anchor}
    </Tooltip>
  );
};

export default SetupTooltip;
