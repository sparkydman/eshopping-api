import { DocumentDefinition } from 'mongoose';
import userModel, { UserDocument } from '../model/user.model';

export async function createUser(
  input: DocumentDefinition<UserDocument>
): Promise<UserDocument> {
  try {
    const user = await userModel.create(input);
    return user;
  } catch (e: any) {
    throw new Error(e);
  }
}
