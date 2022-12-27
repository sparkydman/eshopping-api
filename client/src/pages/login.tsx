import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';

const loginSchema = object({
  email: string().email({ message: 'provide a valid email address' }),
  password: string().min(1, 'password is required'),
});

type LoginType = TypeOf<typeof loginSchema>;

export default function Login() {
  const [loginErr, setLoginErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const submit = async (value: LoginType) => {
    try {
      setIsLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/sessions`,
        value,
        { withCredentials: true }
      );
      router.push('/');
    } catch (e: any) {
      setLoginErr(e.message);
      setIsLoading(false);
    }
  };
  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit(submit)}>
        <h1>Please login</h1>
        <p className='field-error'>{loginErr}</p>
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
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'loading...' : 'Login'}
          </button>
        </div>
        <span className='auth-redirect'>
          <p>You don&apos;t acount? </p>
          <Link href='/register'>Please create account</Link>
        </span>
      </form>
    </div>
  );
}
