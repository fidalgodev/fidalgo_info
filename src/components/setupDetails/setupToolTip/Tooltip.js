import React from 'react';
import Tooltip from 'react-tooltip-lite';
import { useSpring, animated, config } from 'react-spring';

import useWidthChanged from './useWidthChanged';

const SetupTooltip = ({ isOpened, anchor, children }) => {
  const width = useWidthChanged();

  const tooltipAnimation = useSpring({
    opacity: isOpened ? '1' : '0',
    transform: `translateY(${isOpened ? '0rem' : '2rem'})`,
    config: config.gentle
  });

  return (
    <Tooltip
      key={`${width}`}
      isOpen={isOpened}
      tagName="div"
      className="tooltipInnerWrapper"
      tipContentClassName="tooltipContent"
      background="var(--tooltipBackground)"
      direction="down"
      arrowSize={7}
      distance={10}
      padding="0"
      content={<animated.div style={tooltipAnimation}>{children}</animated.div>}
    >
      {React.cloneElement(anchor)}
    </Tooltip>
  );
};

export default SetupTooltip;