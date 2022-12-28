import React from 'react';
import { useFetchData } from '../hooks';
import { IProduct } from '../interfaces';
import Product from './product';

const Products = () => {
  const { isLoading, data } = useFetchData<[IProduct]>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products`,{}
  );
  return (
    <div className='container'>
      {isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <div>
          {data.map((p) => (
            <Product key={p._id} product={p} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Products;
