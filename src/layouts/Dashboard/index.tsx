import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Main from './Main';

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
        <Footer />
      </Main>
    </>
  );
};

export default DashboardLayout;
