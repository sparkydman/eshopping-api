import { Express, Request, Response } from 'express';
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  getProductsHandler,
  getUserProductsHandler,
  updateProductHandler,
} from './controller/production.controller';
import {
  createUserSessionHandler,
  deleteUserSessions,
  getUserSessions,
} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import { requiredUser } from './middleware/requiredUser';
import validateResource from './middleware/validateResource';
import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} from './schema/product.schema';
import { createUserSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';
import { deleteProduct } from './service/product.service';

const routes = (app: Express) => {
  // ******User routes********************************
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  // ******Session routes********************************
  app.post(
    '/api/sessions',
    validateResource(createUserSessionSchema),
    createUserSessionHandler
  );
  app.get('/api/sessions', requiredUser, getUserSessions);
  app.delete('/api/sessions', requiredUser, deleteUserSessions);

  // ******Product routes*****************************
  app.post(
    '/api/products',
    requiredUser,
    validateResource(createProductSchema),
    createProductHandler
  );
  app.get(
    '/api/products/:productId',
    validateResource(getProductSchema),
    getProductHandler
  );
  app.get('/api/products', getProductsHandler);
  app.get('/api/products/user-products', requiredUser, getUserProductsHandler);
  app.delete(
    '/api/products/:productId',
    requiredUser,
    validateResource(getProductSchema),
    deleteProductHandler
  );
  app.put(
    '/api/products/:productId',
    requiredUser,
    validateResource(updateProductSchema),
    updateProductHandler
  );
};

export default routes;
