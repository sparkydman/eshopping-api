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
import {
  createUserHandler,
  getLoggedUserHandler,
} from './controller/user.controller';
import { requiredUser } from './middleware/requiredUser';
import validateResource from './middleware/validateResource';
import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} from './schema/product.schema';
import { createUserSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

const routes = (app: Express) => {
  // ******User routes********************************
  /**
   * @openapi
   * '/api/users':
   *  post:
   *    tags:
   *    - Users
   *    summary: Create a new user
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateUserInput'
   *    responses:
   *      200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *          description: Conflict
   *      400:
   *          description: Bad Request
   */
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);
  app.get('/api/users/me', requiredUser, getLoggedUserHandler);

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
  app.get(
    '/api/products/user/all_products',
    requiredUser,
    getUserProductsHandler
  );
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
