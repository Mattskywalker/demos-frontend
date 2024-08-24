import React, { ElementType, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

const Loadable = (Component: ElementType) => (props: any) => {
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<>Loading . . .</>}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
