import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
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
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/sessions`, {
        withCredentials: true,
      });
      //   router.push('/');
      window.location.reload();
    } catch (e: any) {
      setLoading(false);
      console.log(e.message);
    }
  };
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
            <button disabled={loading} onClick={() => logout()}>
              Logout
            </button>
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
