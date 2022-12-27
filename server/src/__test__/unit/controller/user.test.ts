import * as Data from '../../mocks';
import * as UserService from '../../../service/user.service';
import * as UserController from '../../../controller/user.controller';

describe('user controller', () => {
  describe('create a user', () => {
    describe('given that the user fields are valid', () => {
      it('should create a new user', async () => {
        const send = jest.fn();
        const req = { body: Data.userInput };
        const res = { send };
        const responseValue = Data.userResponse;
        //@ts-ignore
        responseValue.toJSON = jest.fn();

        const mockCreateUser = jest
          .spyOn(UserService, 'createUser')
          //@ts-ignore
          .mockReturnValue(responseValue);

        //@ts-ignore
        await UserController.createUserHandler(req, res);

        expect(mockCreateUser).toHaveBeenCalledWith(req.body);
        expect(send).toHaveBeenCalledWith(expect.any(Object));
      });
    });
  });
});
