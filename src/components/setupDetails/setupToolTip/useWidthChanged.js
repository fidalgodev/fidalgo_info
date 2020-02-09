import { useState, useEffect } from 'react';

function useWidthChanged() {
  const [width, setWidth] = useState(window && window.innerWidth);

  const handleResize = () => setWidth(window && window.innerWidth);

  useEffect(() => {
    window && window.addEventListener('resize', handleResize);
    return () => {
      window && window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}

export default useWidthChanged;
