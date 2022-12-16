import { Request, Response } from 'express';
import { get } from 'lodash';
import { CreateProductInput } from '../schema/product.schema';
import { createProduct } from '../service/product.service';

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response
) {
  const userId = get(res.locals.user, '_id');
  const payload = { ...req.body, userId };

  const product = await createProduct(payload);

  res.send(product);
}
