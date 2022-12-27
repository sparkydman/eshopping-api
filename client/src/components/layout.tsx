import Link from 'next/link';
import React from 'react';
import { IUser } from '../interfaces';

const Layout = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: IUser | null | undefined;
}) => {
  return (
    <>
      {user ? <AuthenticatedNav user={user} /> : <UnAuthenticatedNav />}
      <main>{children}</main>
    </>
  );
};

const AuthenticatedNav = ({ user }: { user: IUser }) => {
  return (
    <nav className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link href='/'>Logo</Link>
        </div>
        <ul className='nav-menu'>
          <li>
            <p>Welcome, {user.name}</p>
          </li>
          <li>
            <Link href='/cart'>My Cart</Link>
          </li>
          <li>
            <Link href='/cart'>Profile</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const UnAuthenticatedNav = () => {
  return (
    <nav className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link href='/'>Logo</Link>
        </div>
        <ul className='nav-menu'>
          <li>
            <Link href='/login'>Login</Link>
          </li>
          <li>
            <Link href='/register'>Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Layout;
