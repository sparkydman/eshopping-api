import { Request, Response } from 'express';
import { get } from 'lodash';
import {
  CreateProductInput,
  GetProductInput,
  UpdateProductInput,
} from '../schema/product.schema';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../service/product.service';

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response
) {
  const userId = get(res.locals.user, '_id');
  const payload = { ...req.body, userId };

  const product = await createProduct(payload);

  res.send(product);
}

export async function updateProductHandler(
  req: Request<UpdateProductInput['params']>,
  res: Response
) {
  const userId = get(res.locals.user, '_id');

  const product = await getProduct({ _id: req.params.productId });

  if (!product) return res.status(404).send('product not found');
  if (product.userId.toString() !== userId)
    return res.status(403).send('your are not allowed to perform this action');

  const updatedProduct = await updateProduct(
    { _id: req.params.productId, userId: userId },
    req.body,
    { new: true }
  );

  res.send(updatedProduct);
}

export async function getUserProductsHandler(req: Request, res: Response) {
  const userId = get(res.locals.user, '_id');

  const products = await getProducts({ userId });
  res.send(products);
}

export async function getProductsHandler(req: Request, res: Response) {
  const products = await getProducts({});
  res.send(products);
}

export async function getProductHandler(
  req: Request<GetProductInput['params']>,
  res: Response
) {
  const product = await getProduct({ _id: req.params.productId });
  res.send(product);
}

export async function deleteProductHandler(
  req: Request<GetProductInput['params']>,
  res: Response
) {
  const userId = get(res.locals.user, '_id');

  const product = await getProduct({ _id: req.params.productId });

  if (!product) return res.status(404).send('product not found');
  if (product.userId.toString() !== userId) return res.status(403).send('you are not allowed to perform this action');

  await deleteProduct({ _id: req.params.productId });

  res.send('Product deleted successfully');
}
