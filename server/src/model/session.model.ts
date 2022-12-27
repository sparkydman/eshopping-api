import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  isValid: boolean;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema<SessionDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isValid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const sessionModel = mongoose.model<SessionDocument>('Session', userSchema);

export default sessionModel;
