import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IProduct } from '../interfaces';

const Product = ({ product }: { product: IProduct }) => {
  return (
    <div className='product-card'>
      <div className='card-top'>
        <Link href={`/product/${product._id}`}>
          <Image
            width={200}
            height={100}
            src={product.image}
            alt={product.title}
            className='card-image'
          />
        </Link>
      </div>
      <div className='card-body'>
        <Link href={`/product/${product._id}`}>
          <h4>{product.title}</h4>
        </Link>
      </div>
      <div className='card-bottom'>
        <button>Add to cart</button>
      </div>
    </div>
  );
};

export default Product;
