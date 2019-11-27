import { useEffect, useCallback } from "react";

function useClickOutsideRegions(closeTooltip, excludedRegionRefs) {
  const handleClick = useCallback(
    event => {
      const wasClickInsideSomeRef = excludedRegionRefs.current.some(node => {
        if (!node) return false;

        return node.contains(event.target);
      });

      if (!wasClickInsideSomeRef) {
        closeTooltip();
      }
    },
    [closeTooltip, excludedRegionRefs]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);
}

export default useClickOutsideRegions;
