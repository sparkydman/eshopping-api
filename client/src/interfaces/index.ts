export interface IUser {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

export interface IProduct {
  userId: object;
  title: string;
  description: string;
  price: number;
  image: string;
  isInStock?: boolean;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  __v: number;
}
