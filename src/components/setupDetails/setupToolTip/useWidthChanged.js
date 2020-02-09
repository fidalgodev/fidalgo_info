import { useState, useEffect } from 'react';

function useWidthChanged() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' && window.innerWidth
  );

  const handleResize = () =>
    setWidth(typeof window !== 'undefined' && window.innerWidth);

  useEffect(() => {
    typeof window !== 'undefined' &&
      window.addEventListener('resize', handleResize);
    return () => {
      typeof window !== 'undefined' &&
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}

export default useWidthChanged;
