import mongoose from 'mongoose';

export const userId = new mongoose.Types.ObjectId().toString();
export const productId = new mongoose.Types.ObjectId().toString();
export const sessionId = new mongoose.Types.ObjectId().toString();

export const productResponse = {
  _id: productId,
  userId: userId,
  title: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
  description:
    'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
  price: 699.99,
  image: 'https://i.imgur.com/QlRphfQ.jpg',
  isInStock: true,
  createdAt: new Date('2022-12-16T03:05:50.390Z'),
  updatedAt: new Date('2022-12-16T03:05:50.390Z'),
  __v: 0,
};

export const productInput = {
  title: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
  description:
    'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
  price: 879.99,
  image: 'https://i.imgur.com/QlRphfQ.jpg',
};

export const userInput = {
  email: 'janedoe@email.com',
  password: 'password123',
  confirmPassword: 'password123',
  name: 'Jane Doe',
};

export const userResponse = {
  _id: new mongoose.Types.ObjectId().toString(),
  email: 'janedoe@email.com',
  name: 'Jane Doe',
  password: expect.any(String),
  createdAt: new Date('2022-12-16T03:05:50.390Z'),
  updatedAt: new Date('2022-12-16T03:05:50.390Z'),
  __v: 0,
};

export const sessionInput = {
  email: 'janedoe@email.com',
  password: 'password123',
};

export const sessionResponse = {
  _id: new mongoose.Types.ObjectId().toString(),
  userId: userId,
  isValid: true,
  createdAt: new Date('2022-12-16T01:30:23.870Z'),
  updatedAt: new Date('2022-12-16T01:30:23.870Z'),
  __v: 0,
};

export const TokeResponse = {
  accessToken: expect.any(String),
  refreshToken: expect.any(String),
};
