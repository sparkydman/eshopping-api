import { GetServerSideProps, NextPage } from 'next';
import useSwr from 'swr';
import Layout from '../components/layout';
import fetcher from '../fetcher';
import { IUser } from '../interfaces';

const Home: NextPage<{ fallbackData: IUser }> = ({ fallbackData }) => {
  const { data } = useSwr<IUser | null>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`,
    fetcher,
    { fallbackData }
  );

  return (
    <Layout user={data}>
      <p>Home page</p>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`,
    ctx.req.headers
  );
  return { props: { fallbackData: result } };
};

export default Home;
