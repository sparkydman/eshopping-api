import { GetServerSideProps, NextPage } from 'next';
import Layout from '../components/layout';
import Products from '../components/products';
import fetcher from '../fetcher';
import { IUser } from '../interfaces';

const Home: NextPage<{ fallbackData: IUser }> = ({ fallbackData }) => {
  return (
    <Layout fallbackData={fallbackData}>
      <div className='home'>
        <Products />
      </div>
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
