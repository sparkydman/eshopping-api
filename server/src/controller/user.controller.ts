import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import log from '../utils/logger';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    res.send(omit(user.toJSON(), 'password'));
  } catch (e: any) {
    log.error(e);
    res.status(409).send(e.message);
  }
}

export async function getLoggedUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}
