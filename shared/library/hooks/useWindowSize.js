import React from 'react';

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getSize = React.useCallback(
    () => ({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }),
    [isClient]
  );

  const [size, setSize] = React.useState(getSize);

  React.useEffect(() => {
    if (!isClient) {
      return false;
    }
    const onHandleResize = () => {
      setSize(getSize);
    };
    window.addEventListener('resize', onHandleResize);
    return () => window.removeEventListener('resize', onHandleResize);
  }, [getSize, isClient]);

  return size;
};

export default useWindowSize;
