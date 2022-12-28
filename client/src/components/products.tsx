import React from 'react'
import { useGetProducts } from '../hooks';
import Product from './product';

const Products = () => {
    const { isLoading, data } = useGetProducts();
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
}

export default Products