import { Request, Response } from 'express';
import { createUser } from '../services/user.services';
import log from '../utils/logger';

export async function newUser(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (e: any) {
    log.error(e);
    res.status(409).send(e.message);
  }
}
