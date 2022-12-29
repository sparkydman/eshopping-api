import mongoose, { PopulatedDoc } from 'mongoose';
import { UserDocument } from './user.model';

export interface IProduct {
  user: PopulatedDoc<UserDocument['_id'] & IPopulateUser>;
  title: string;
  description: string;
  price: number;
  image: string;
  isInStock?: boolean;
}

export interface IPopulateUser {
  name: string;
  image: string;
  _id: UserDocument['_id'];
}

export interface ProductDocument extends IProduct, mongoose.Document {
  createdAt: string;
  updatedAt: string;
}

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    isInStock: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model<ProductDocument>('Product', productSchema);

export default userModel;
