import React from 'react';
import Header from './Header/Header';
import {Outlet} from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <>
     <Header/>
     <main className={'container content'}>
       <Outlet/>
     </main>
    </>
  );
};

export default Layout;