import React from 'react';
import { Header } from '../Header/Header';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={'container'}>
      <header className={'header'}>
        <Header />
      </header>
      {children}
    </div>
  );
};
