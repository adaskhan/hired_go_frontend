import React from 'react';
import { Outlet } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';

function PublicRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <DefaultLayout>{children}</DefaultLayout>;
  } else {
    if (user) {
      return <DefaultLayout>{children}</DefaultLayout>;
    }
    window.location.href = '/';
  }
}

export default PublicRoute;
