import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/router';

const createUserSchema = object({
  name: string().min(4, 'full name can not be less than 4 characters'),
  email: string().email({
    message: 'Invalid email',
  }),
  password: string().min(6, 'password must be at least 6 characters'),
  confirmPassword: string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'password do not match',
  path: ['confirmPassword'],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

export default function Register() {
  const [registerErr, setRegisterErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const submit = async (value: CreateUserInput) => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
        value,
        {
          withCredentials: true,
        }
      );
      if (result) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/sessions`,
          { email: value.email, password: value.password },
          { withCredentials: true }
        );
        router.push('/');
      }
    } catch (error: any) {
      setRegisterErr(error?.message);
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(submit)}>
        <h1>Create account</h1>
        <p className='field-error'>{registerErr}</p>
        <div className='form-control'>
          <label htmlFor='name'>Full Name</label>
          <input
            type='text'
            placeholder='John Doe'
            id='name'
            {...register('name')}
          />
          {errors?.name && (
            <p className='field-error'>
              <>{errors.name?.message}</>
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            placeholder='johndoe@doe.com'
            id='email'
            {...register('email')}
          />
          {errors?.email && (
            <p className='field-error'>
              <>{errors.email?.message}</>
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='******'
            id='password'
            {...register('password')}
          />
          {errors?.password && (
            <p className='field-error'>
              <>{errors.password?.message}</>
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            placeholder='******'
            id='confirmPassword'
            {...register('confirmPassword')}
          />
          {errors?.confirmPassword && (
            <p className='field-error'>
              <>{errors.confirmPassword?.message}</>
            </p>
          )}
        </div>
        <div className='form-control'>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Submiting...' : 'SUBMIT'}
          </button>
        </div>
        <span className='auth-redirect'>
          <p>You ready have an acount? </p>
          <Link href='/login'>Please login</Link>
        </span>
      </form>
    </div>
  );
}
