import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/layout';
import fetcher from '../../fetcher';
import { useFetchData } from '../../hooks';
import { IProduct, IUser } from '../../interfaces';

const ProductPage: NextPage<{
  fallbackData: IUser | null;
  product: IProduct | null;
}> = ({ fallbackData, product }) => {
  const router = useRouter();
  const { isLoading, data } = useFetchData<IProduct>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${router.query.id}`,
    { fallbackData: product }
  );
  return (
    <Layout fallbackData={fallbackData}>
      {isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <div className='home'>
          <div className='container'>
            <div className='product-detail'>
              <div className='img-wrapper'>
                <Image
                  src={data.image}
                  alt={data.title}
                  width={600}
                  height={500}
                />
              </div>
              <div className='product-info'>
                <ul>
                  <li>
                    <h3>{data.title}</h3>
                  </li>
                  <li>
                    <h3>NGN{data.price}</h3>
                  </li>
                  <li>
                    <p>{data.description}</p>
                  </li>
                  <li>
                    <p>
                      <span>In stock:</span>{' '}
                      <span>{data.isInStock ? 'Yes' : 'No'}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Created at:</span>{' '}
                      <span>{data.createdAt.toString()}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>Uploaded by:</span>{' '}
                      <span>
                        <Link href={`/profile/${data.user._id}`}>
                          {data.user.name}
                        </Link>
                      </span>
                    </p>
                  </li>
                  <li>
                    <button>Add to cart</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let result = null;
  let user = null;
  result = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${ctx.query.id}`
  );
  user = await fetcher(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`);

  return {
    props: { fallbackData: user, product: result },
  };
};

export default ProductPage;
