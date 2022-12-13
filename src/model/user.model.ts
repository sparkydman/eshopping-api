import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface IUser {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends IUser, mongoose.Document {
  createdAt: string;
  updatedAt: string;
  comparePassword(userPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('bcryptSaltRound'));
  const hashPassword = await bcrypt.hashSync(user.password, salt);

  user.password = hashPassword;
  return next();
});

userSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  let user = this as UserDocument;

  return bcrypt.compare(userPassword, user.password).catch(() => false);
};

const userModel = mongoose.model('User', userSchema);

export default userModel;
