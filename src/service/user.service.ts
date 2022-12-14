import { omit } from 'lodash';
import { DocumentDefinition } from 'mongoose';
import userModel, { IUser, UserDocument } from '../model/user.model';

export async function createUser(
  input: DocumentDefinition<IUser>
): Promise<UserDocument> {
  try {
    const user = await userModel.create(input);
    return user;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validateUserPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await userModel.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
}
