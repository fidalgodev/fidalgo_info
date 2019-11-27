import { useState, useEffect } from 'react';

function useWidthChanged() {
  const [width, setWidth] = useState(window.innerWidth);

  console.log(width);

  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}

export default useWidthChanged;
