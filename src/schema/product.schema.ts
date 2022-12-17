import { number, object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    title: string({ required_error: 'title is required' }).min(
      3,
      'title cannot be less than 3 characters'
    ),
    description: string({ required_error: 'description is required' }).min(
      50,
      'description cannot be less than 50 characters'
    ),
    price: number({ required_error: 'price is required' }),
    image: string({ required_error: 'image is required' }),
  }),
};

const params = {
  params: object({
    productId: string({ required_error: 'productId is required' }),
  }),
};

export const createProductSchema = object({ ...payload });
export const updateProductSchema = object({ ...params, ...payload });
export const getProductSchema = object({ ...params});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
