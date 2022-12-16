import { Express, Request, Response } from 'express';
import {
  createUserSessionHandler,
  getUserSessions,
} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import { requiredUser } from './middleware/requiredUser';
import validateResource from './middleware/validateResource';
import { createUserSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).send('working');
  });

  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  app.post(
    '/api/sessions',
    validateResource(createUserSessionSchema),
    createUserSessionHandler
  );
  app.get('/api/sessions', requiredUser, getUserSessions);
};

export default routes;
