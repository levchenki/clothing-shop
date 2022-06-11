import React from 'react';
import {Outlet} from 'react-router';
import Header from './Header/Header';
import {Container} from './Container';

const Layout = () => {
  return (
      <>
        <Header/>
        {/*<Container elementOuter={'main'}>*/}
        <main className={'content container'}>
          <Outlet/>
        </main>
        {/*</Container>*/}
        {/*<footer className={'container'}>*/}
        {/*  footer*/}
        {/*</footer>*/}
      </>
  );
};

export default Layout;