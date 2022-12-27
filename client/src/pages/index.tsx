import { GetServerSideProps, NextPage } from 'next';
import useSwr from 'swr';
import fetcher from '../fetcher';

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

const Home: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
  const { data } = useSwr<User | null>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`,
    fetcher,
    { fallbackData }
  );
  if (data) {
    return <p>{data.name}</p>;
  }

  return (
    <>
      <p>home page</p>
    </>
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
