import { Inter } from '@next/font/google';
import axios from 'axios';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import { useUser } from '../hooks';
import { IUser } from '../interfaces';
import { menuList } from './dashboard/routes';

const inter = Inter({ subsets: ['latin'] });

const Layout = ({
  children,
  fallbackData,
}: {
  children: ReactNode;
  fallbackData: IUser | null | undefined;
}) => {
  const { user } = useUser({ fallbackData });
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
            <p>Hello, {user.name}</p>
          </li>
          <li>
            <Link href='/cart'>My Cart</Link>
          </li>
          <li>
            <Link href={`/dashboard/${user._id}`}>Dashboard</Link>
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

export const DashboardLayout = ({ children }: any) => {
  const { user, isLoading } = useUser({ fallbackData: null });
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
    <div className={inter.className}>
      <nav className='navbar'>
        <div className='container'>
          <div className='logo'>
            <Link href='/'>Logo</Link>
          </div>
          <ul className='nav-menu'>
            <li>
              <p>Hello, {user?.name}</p>
            </li>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <button disabled={loading} onClick={() => logout()}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className='dashboard-main'>
        <aside>
          <ul>
            {menuList.map((menu, i) => (
              <li key={`menu-list-${i}`}>
                <Link href={`/dashboard/${user?._id}${menu.path}`}>
                  {menu.lable}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
