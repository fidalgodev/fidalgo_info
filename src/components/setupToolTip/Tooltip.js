import React from 'react';
import Tooltip from 'react-tooltip-lite';

const SetupTooltip = ({ id, isOpened, anchor, children }) => {
  const propsToAnchor = {
    'aria-controls': id,
    'aria-labelledby': id,
    role: 'tooltip'
  };

  return (
    <Tooltip
      isOpen={isOpened}
      tagName="span"
      direction="down"
      // forceDirection
      content={<div style={{ backgroundColor: 'red' }}>{children}</div>}
    >
      {React.cloneElement(anchor, propsToAnchor)}
    </Tooltip>
  );
};

export default SetupTooltip;
