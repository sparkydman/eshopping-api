import { Express, Request, Response } from 'express';
import { createProductHandler } from './controller/production.controller';
import {
  createUserSessionHandler,
  deleteUserSessions,
  getUserSessions,
} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import { requiredUser } from './middleware/requiredUser';
import validateResource from './middleware/validateResource';
import { createProductSchema } from './schema/product.schema';
import { createUserSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

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
};

export default routes;
