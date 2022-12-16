import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import ProductModel, {
  IProduct,
  ProductDocument,
} from '../model/product.model';

export async function createProduct(input: DocumentDefinition<IProduct>) {
  return await ProductModel.create(input);
}

export async function getProducts(query: FilterQuery<ProductDocument>) {
  return await ProductModel.find(query).lean();
}

export async function getProduct(query: FilterQuery<ProductDocument>) {
  return await ProductModel.findOne(query).lean();
}

export async function updateProduct(
  query: FilterQuery<ProductDocument>,
  payload: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return await ProductModel.findOneAndUpdate(query, payload, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return await ProductModel.deleteOne(query);
}
