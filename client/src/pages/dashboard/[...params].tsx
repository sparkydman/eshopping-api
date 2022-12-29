import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import AddProduct from '../../components/dashboard/addProduct';
import DashbordCart from '../../components/dashboard/cart';
import DashboardHome from '../../components/dashboard/dashboardHome';
import Goods from '../../components/dashboard/goods';
import Orders from '../../components/dashboard/orders';
import Purchases from '../../components/dashboard/purchases';
import WishList from '../../components/dashboard/wishList';
import { DashboardLayout } from '../../components/layout';
import fetcher from '../../fetcher';
import { useUser } from '../../hooks';
import { IUser } from '../../interfaces';

const getComponent = (path: string, user: IUser) => {
  switch (path) {
    case 'add-product':
      return <AddProduct user={user} />;
    case 'purchases':
      return <Purchases user={user} />;
    case 'goods':
      return <Goods user={user} />;
    case 'wish-list':
      return <WishList user={user} />;
    case 'cart':
      return <DashbordCart user={user} />;
    case 'orders':
      return <Orders user={user} />;
    default:
      <DashboardHome user={user} />;
  }
};

const DashboardPage = ({ fallbackData }: { fallbackData: IUser }) => {
  const { user } = useUser({ fallbackData });
  const router = useRouter();
  const path = router.query?.params ? router.query.params[1] : '/';
  return <>{path && user ? getComponent(path, user) : null}</>;
};

DashboardPage.getLayout = function (page: typeof DashboardPage) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = await fetcher<IUser>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`,
    ctx.req.headers
  );
  if (!result) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { fallbackData: result } };
};

export default DashboardPage;
