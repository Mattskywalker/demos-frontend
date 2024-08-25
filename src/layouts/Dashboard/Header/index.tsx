import React from 'react';
import './styles.css';
import GetDemoLogo from 'assets/getDemoLogo';

const Header = () => {
  return (
    <header className="header">
      <GetDemoLogo size="32px" />
      <h1 style={{ color: '#000' }}>Getdemo Viewer</h1>
    </header>
  );
};

export default Header;
