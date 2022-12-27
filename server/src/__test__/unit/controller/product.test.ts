import * as ProductService from '../../../service/product.service';
import * as ProductController from '../../../controller/production.controller';
import * as Data from '../../mocks';

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
            'you are not allowed to perform this action'
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
          const updatedResponse = Data.productResponse;

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

    describe('get a product handler', () => {
      describe('given that the productId does not exit', () => {
        it('should return status code of 404 and error message', async () => {
          const getProductMock = jest
            .spyOn(ProductService, 'getProduct')
            //@ts-ignore
            .mockReturnValue(null);

          const status = jest.fn();
          const send = jest.fn();

          const req = { params: { productId: Data.productId } };
          const res = { status, send };

          //@ts-ignore
          await ProductController.getProductHandler(req, res);

          expect(getProductMock).toHaveBeenCalledWith({ _id: Data.productId });
          expect(status).toHaveBeenCalledWith(404);
          expect(send).toHaveBeenCalledWith('product not found');
        });
      });

      describe('given that the productId does exist', () => {
        it('should return product', async () => {
          const getProductMock = jest
            .spyOn(ProductService, 'getProduct')
            //@ts-ignore
            .mockReturnValue(Data.productResponse);

          const send = jest.fn();

          const req = { params: { productId: Data.productId } };
          const res = { send };

          //@ts-ignore
          await ProductController.getProductHandler(req, res);

          expect(getProductMock).toHaveBeenCalledWith({ _id: Data.productId });
          expect(send).toHaveBeenCalledWith(Data.productResponse);
        });
      });
    });

    describe('get products handler', () => {
      it('should return array of products', async () => {
        const getProductsMock = jest
          .spyOn(ProductService, 'getProducts')
          //@ts-ignore
          .mockReturnValue([Data.productResponse]);

        const send = jest.fn();

        const req = {};
        const res = { locals: { user: Data.userResponse }, send };

        //@ts-ignore
        await ProductController.getProductsHandler(req, res);

        expect(getProductsMock).toHaveBeenCalledWith({});
        expect(send).toHaveBeenCalledWith(expect.any(Array));
      });
    });

    describe('get products handler', () => {
      describe('given user session exist', () => {
        it('should return array of products', async () => {
          const getProductsMock = jest
            .spyOn(ProductService, 'getProducts')
            //@ts-ignore
            .mockReturnValue([Data.productResponse]);

          const send = jest.fn();

          const req = {};
          const res = { locals: { user: Data.userResponse }, send };

          //@ts-ignore
          await ProductController.getUserProductsHandler(req, res);

          expect(getProductsMock).toHaveBeenCalledWith({
            userId: res.locals.user._id,
          });
          expect(send).toHaveBeenCalledWith(expect.any(Array));
        });
      });
    });

    describe('delete a product handler', () => {
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
          await ProductController.deleteProductHandler(req, res);

          expect(getProductMock).toHaveBeenCalledWith({ _id: Data.productId });
          expect(status).toHaveBeenCalledWith(404);
          expect(send).toHaveBeenCalledWith('product not found');
        });
      });

      describe('given that the productId and user is the owner', () => {
        it('should return the success message', async () => {
          const send = jest.fn();
          const updatedResponse = Data.productResponse;

          const req = { params: { productId: Data.productId } };
          const res = { locals: { user: Data.userResponse }, send };
          updatedResponse.userId = res.locals.user._id;

          const getProductMock = jest
            .spyOn(ProductService, 'getProduct')
            //@ts-ignore
            .mockReturnValue(updatedResponse);
          const deleteProductMock = jest
            .spyOn(ProductService, 'deleteProduct')
            //@ts-ignore
            .mockReturnValue(Data.productResponse);

          //@ts-ignore
          await ProductController.deleteProductHandler(req, res);

          expect(getProductMock).toHaveBeenCalledWith({ _id: Data.productId });
          expect(deleteProductMock).toHaveBeenCalled();
          expect(send).toHaveBeenCalledWith('Product deleted successfully');
        });
      });
    });
  });