import { ReactNode, FC } from 'react';

interface IHeaderProps {
  children: ReactNode;
}
const Header:FC<IHeaderProps> = ({ children }) => {
  return (
    <header className="header">
      {children}
    </header>
  );
};

export default Header;