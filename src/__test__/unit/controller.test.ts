import * as ProductService from '../../service/product.service';
import * as ProductController from '../../controller/production.controller';
import * as Data from '../mocks';

describe('controller', () => {
  describe('product controller', () => {
    describe('create a product handler', () => {
      describe('give that all the product field are valid', () => {
        it('should create a product and return it', async () => {
          const createProductMock = jest
            .spyOn(ProductService, 'createProduct')
            //@ts-ignore
            .mockReturnValue(Data.productResponse);

          const send = jest.fn();

          const req = { body: Data.productInput };
          const res = { locals: { user: Data.userResponse }, send };

          //@ts-ignore
          await ProductController.createProductHandler(req, res);

          expect(createProductMock).toHaveBeenCalledWith({
            ...Data.productInput,
            userId: Data.userResponse._id,
          });
          expect(send).toHaveBeenCalledWith(Data.productResponse);
        });
      });
    });

    describe('update a product handler', () => {
      describe('given that the productId does not exit', () => {
        it('should return status code of 404 and error message', async () => {
          const getProductMock = jest
            .spyOn(ProductService, 'getProduct')
            //@ts-ignore
            .mockReturnValue(null);

          const status = jest.fn();
          const send = jest.fn();

          const req = { params: { productId: Data.productId } };
          const res = { locals: { user: Data.userResponse }, status, send };

          //@ts-ignore
          await ProductController.updateProductHandler(req, res);

          expect(getProductMock).toHaveBeenCalledWith({ _id: Data.productId });
          expect(status).toHaveBeenCalledWith(404);
          expect(send).toHaveBeenCalledWith('product not found');
        });
      });

      describe('given that the productId and user not the owner', () => {
        it('should return status code of 403 and error message', async () => {
          const getProductMock = jest
            .spyOn(ProductService, 'getProduct')
            //@ts-ignore
            .mockReturnValue(Data.productResponse);

          const status = jest.fn();
          const send = jest.fn();

          const req = { params: { productId: Data.productId } };
          const res = { locals: { user: Data.userResponse }, status, send };

          //@ts-ignore
          await ProductController.updateProductHandler(req, res);

          expect(getProductMock).toHaveBeenCalledWith({ _id: Data.productId });
          expect(status).toHaveBeenCalledWith(403);
          expect(send).toHaveBeenCalledWith(
            'your are not allowed to perform this action'
          );
        });
      });

      describe('given that the productId and user is the owner', () => {
        it('should return the updated product', async () => {
          const updatedProduct = {
            ...Data.productInput,
            price: 700,
            title: 'The updated product',
          };
          const status = jest.fn();
          const send = jest.fn();
          const updatedResponse = Data.productResponse
          
          const req = { params: { productId: Data.productId } };
          const res = { locals: { user: Data.userResponse }, status, send };
          updatedResponse.userId = res.locals.user._id;
          updatedResponse.price = updatedProduct.price;
          updatedResponse.title = updatedProduct.title;

          const getProductMock = jest
            .spyOn(ProductService, 'getProduct')
            //@ts-ignore
            .mockReturnValue(Data.productResponse);
          const updateProductMock = jest
            .spyOn(ProductService, 'updateProduct')
            //@ts-ignore
            .mockReturnValue(updatedResponse);

          //@ts-ignore
          await ProductController.updateProductHandler(req, res);

          expect(getProductMock).toHaveBeenCalledWith({ _id: Data.productId });
          expect(updateProductMock).toHaveBeenCalled();
          expect(send).toHaveBeenCalledWith(updatedResponse);
        });
      });
    });
  });
});
