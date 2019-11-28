import { useEffect } from 'react';

function useClickOutsideRegion(closeTooltip, excludedRegionRef) {
  useEffect(() => {
    const handleClick = e => {
      const wasClickOutsideRef =
        excludedRegionRef.current &&
        !excludedRegionRef.current.contains(e.target);

      if (wasClickOutsideRef) {
        closeTooltip();
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [closeTooltip, excludedRegionRef]);
}

export default useClickOutsideRegion;
