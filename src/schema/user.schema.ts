import { Omit } from 'lodash';
import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({ required_error: 'name is required' }),
    email: string({ required_error: 'email is required' }).email({
      message: 'Invalid email',
    }),
    password: string({ required_error: 'password is required' }).min(
      6,
      'password must be at least 6 characters'
    ),
    confirmPassword: string({ required_error: 'confirmPassword is required' }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'password do not match',
    path: ['confirmPassword'],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.confirmPassword'
>;
