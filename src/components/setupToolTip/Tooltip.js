import React from 'react';
import Tooltip from 'react-tooltip-lite';

import useWidthChanged from './useWidthChanged';

const SetupTooltip = ({ id, isOpened, anchor, children }) => {
  const propsToAnchor = {
    'aria-controls': id,
    'aria-labelledby': id,
    role: 'tooltip'
  };

  const width = useWidthChanged();

  return (
    <Tooltip
      key={width}
      isOpen={isOpened}
      tagName="div"
      className="tooltipInnerWrapper"
      tipContentClassName="tooltipContent"
      background="var(--tooltipBackground)"
      direction="down"
      arrowSize={7}
      distance={10}
      padding="0"
      content={children}
    >
      {React.cloneElement(anchor, propsToAnchor)}
    </Tooltip>
  );
};

export default SetupTooltip;
