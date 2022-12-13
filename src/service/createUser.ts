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
