import { GetServerSideProps } from 'next';
import React from 'react';
import { DashboardLayout } from '../../components/layout';
import fetcher from '../../fetcher';
import { useUser } from '../../hooks';
import { IUser } from '../../interfaces';

const DashboardPage = ({ fallbackData }: { fallbackData: IUser }) => {
  const { user } = useUser({ fallbackData });
  return <div>DashboardPage</div>;
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
