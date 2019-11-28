import { useEffect } from 'react';

function useClickOutsideRegions(closeTooltip, excludedRegionRefs) {
  useEffect(() => {
    const handleClick = event => {
      const wasClickInsideSomeRef = excludedRegionRefs.current.some(node => {
        if (!node) return false;

        return node.contains(event.target);
      });

      if (!wasClickInsideSomeRef) {
        closeTooltip();
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [closeTooltip, excludedRegionRefs]);
}

export default useClickOutsideRegions;
