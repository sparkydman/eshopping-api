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
import { databaseResponseTimeHistogram } from '../utils/metrics';

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response
) {
  const userId = get(res.locals.user, '_id');
  const payload = { ...req.body, userId };

  const metricsLabel = {
    operation: 'createProduct',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const product = await createProduct(payload);
    timer({ ...metricsLabel, success: 'true' });

    res.send(product);
  } catch (error) {
    timer({ ...metricsLabel, success: 'false' });
    throw error;
  }
}

export async function updateProductHandler(
  req: Request<UpdateProductInput['params']>,
  res: Response
) {
  const userId = get(res.locals.user, '_id');

  const metricsLabel = {
    operation: 'updateProduct',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const product = await getProduct({ _id: req.params.productId });

    if (!product) {
      timer({ ...metricsLabel, success: 'false' });
      return res.status(404).send('product not found');
    }
    if (product.userId.toString() !== userId) {
      timer({ ...metricsLabel, success: 'false' });
      return res
        .status(403)
        .send('your are not allowed to perform this action');
    }

    const updatedProduct = await updateProduct(
      { _id: req.params.productId, userId: userId },
      req.body,
      { new: true }
    );
    timer({ ...metricsLabel, success: 'true' });
    res.send(updatedProduct);
  } catch (error) {
    timer({ ...metricsLabel, success: 'false' });
    throw error;
  }
}

export async function getUserProductsHandler(req: Request, res: Response) {
  const userId = get(res.locals.user, '_id');

  const metricsLabel = {
    operation: 'getUserProducts',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const products = await getProducts({ userId });
    timer({ ...metricsLabel, success: 'true' });
    res.send(products);
  } catch (error) {
    timer({ ...metricsLabel, success: 'false' });
    throw error;
  }
}

export async function getProductsHandler(req: Request, res: Response) {
  const metricsLabel = {
    operation: 'getProducts',
  };
  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const products = await getProducts({});
    timer({ ...metricsLabel, success: 'true' });
    res.send(products);
  } catch (error) {
    timer({ ...metricsLabel, success: 'false' });
    throw error;
  }
}

export async function getProductHandler(
  req: Request<GetProductInput['params']>,
  res: Response
) {
  const metricsLabel = {
    operation: 'getProduct',
  };
  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const product = await getProduct({ _id: req.params.productId });
    if (!product) {
      timer({ ...metricsLabel, success: 'false' });
      return res.status(404).send('product not found');
    }
    timer({ ...metricsLabel, success: 'true' });
    res.send(product);
  } catch (error) {
    timer({ ...metricsLabel, success: 'false' });
    throw error;
  }
}

export async function deleteProductHandler(
  req: Request<GetProductInput['params']>,
  res: Response
) {
  const userId = get(res.locals.user, '_id');

  const metricsLabel = {
    operation: 'deleteProduct',
  };
  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const product = await getProduct({ _id: req.params.productId });

    if (!product) {
      timer({ ...metricsLabel, success: 'false' });
      return res.status(404).send('product not found');
    }
    if (product.userId.toString() !== userId) {
      timer({ ...metricsLabel, success: 'false' });
      return res.status(403).send('you are not allowed to perform this action');
    }

    await deleteProduct({ _id: req.params.productId });
    timer({ ...metricsLabel, success: 'true' });
    res.send('Product deleted successfully');
  } catch (error) {
    timer({ ...metricsLabel, success: 'false' });
    throw error;
  }
}
