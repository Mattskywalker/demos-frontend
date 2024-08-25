import GetDemoLogo from '../../assets/GetDemoLogo';
import React, { ElementType, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import './styles.css';

const LoadingAnimation = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(100vh - 6.4rem)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span style={{ position: 'absolute' }}>
        <GetDemoLogo size="120px" />
      </span>
      <div className="spinner"></div>
    </div>
  );
};

const Loadable = (Component: ElementType) => (props: any) => {
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingAnimation />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
