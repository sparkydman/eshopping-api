import createServer from '../utils/server';
import * as mockData from './mocks';
import * as productService from '../service/product.service';
import supertest from 'supertest';
import { signToken } from '../utils/jwt';
import { getUserProductsHandler } from '../controller/production.controller';

const app = createServer();

describe('product', () => {
  describe('get product route', () => {
    describe('given that the product productId does not exist', () => {
      it('should return 404 status code', async () => {
        const mockedProductService = jest
          .spyOn(productService, 'getProduct')
          //@ts-ignore
          .mockReturnValueOnce(null);

        const { statusCode } = await supertest(app).get(
          `/api/products/${mockData.productId}`
        );

        expect(statusCode).toBe(404);
        expect(mockedProductService).toHaveBeenCalled();
      });
    });

    describe('given that the product productId does exist', () => {
      it('should return 200 status code and product', async () => {
        const mockedProductService = jest
          .spyOn(productService, 'getProduct')
          //@ts-ignore
          .mockReturnValueOnce(mockData.productResponse);

        const { statusCode, body } = await supertest(app).get(
          `/api/products/${mockData.productId}`
        );

        expect(statusCode).toBe(200);
        expect(body).toMatchObject(
          expect.objectContaining({
            title: expect.any(String),
            description: expect.any(String),
            _id: expect.any(String),
            price: expect.any(Number),
          })
        );
        expect(mockedProductService).toHaveBeenCalled();
      });
    });
  });

  describe('get products route', () => {
    describe('given that no product has been created', () => {
      it('should return empty array', async () => {
        const mockedProductService = jest
          .spyOn(productService, 'getProducts')
          //@ts-ignore
          .mockReturnValueOnce([]);

        const { statusCode, body } = await supertest(app).get(`/api/products`);

        expect(statusCode).toBe(200);
        expect(body).toEqual([]);
        expect(mockedProductService).toHaveBeenCalled();
      });
    });

    describe('given that product exist', () => {
      it('should return array of products', async () => {
        const mockedProductService = jest
          .spyOn(productService, 'getProducts')
          //@ts-ignore
          .mockReturnValueOnce([mockData.productResponse]);

        const { statusCode, body } = await supertest(app).get(`/api/products`);

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.arrayContaining([expect.any(Object)]));
        expect(mockedProductService).toHaveBeenCalled();
      });
    });
  });

  describe("get user's products route", () => {
    describe('given that user is logged in', () => {
      it('should return array of products', async () => {
        const req = {};
        const send = jest.fn();
        const res = {
          send,
          locals: {
            user: mockData.userResponse,
          },
        };
        const mockedProductService = jest
          .spyOn(productService, 'getProducts')
          //@ts-ignore
          .mockReturnValueOnce([mockData.productResponse]);

        //@ts-ignore
        await getUserProductsHandler(req, res);

        expect(mockedProductService).toHaveBeenCalled();
        expect(send).toHaveBeenCalledWith([mockData.productResponse]);
      });
    });
  });

  describe('create product route', () => {
    describe('given that user is not logged in', () => {
      it('should return 401', () => {});
    });

    describe('given that any product field is not valid', () => {
      it('should return 400 status code and error object', () => {});
    });

    describe('given that product fields are valid', () => {
      it('should return 200 status code and product object', () => {});
    });
  });

  describe('delete product route', () => {
    describe('given that user is not logged in', () => {
      it('should return 401', () => {});
    });

    describe('given that product not found', () => {
      it('should return 404 status code', () => {});
    });

    describe('given that user is logged in and not the owner of product', () => {
      it('should return 403 status code', () => {});
    });

    describe('given that user is logged in and the owner of product', () => {
      it('should return 200 status code', () => {});
    });
  });
});
