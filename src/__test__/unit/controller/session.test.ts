import * as Data from '../../mocks';
import * as SessionService from '../../../service/session.service';
import * as UserService from '../../../service/user.service';
import * as SessionController from '../../../controller/session.controller';

describe('session controller', () => {
  describe('create session', () => {
    describe('given invalid email or password', () => {
      it('should return 400 status code and error message', async () => {
        const req = { body: Data.sessionInput };
        const status = jest.fn();
        const send = jest.fn();
        const res = { status, send };

        const mockValidatePassword = jest
          .spyOn(UserService, 'validateUserPassword')
          //@ts-ignore
          .mockReturnValue(false);
        //@ts-ignore
        await SessionController.createUserSessionHandler(req, res);
        expect(mockValidatePassword).toHaveBeenCalledWith(req.body);
        expect(status).toHaveBeenCalledWith(400);
        expect(send).toHaveBeenCalledWith('Incorrect user email or password');
      });
    });
    describe('given valid email or password', () => {
      it('should return accessToken and RefressToken', async () => {
        const req = { body: Data.sessionInput, get: jest.fn() };
        const status = jest.fn();
        const send = jest.fn();
        const res = { status, send };

        const mockValidatePassword = jest
          .spyOn(UserService, 'validateUserPassword')
          //@ts-ignore
          .mockReturnValue(Data.userResponse);
        const mockCreateSession = jest
          .spyOn(SessionService, 'createUserSession')
          //@ts-ignore
          .mockReturnValue(Data.sessionResponse);

        //@ts-ignore
        await SessionController.createUserSessionHandler(req, res);
        expect(mockValidatePassword).toHaveBeenCalledWith(req.body);
        expect(mockCreateSession).toHaveBeenCalled();
        expect(send).toHaveBeenCalledWith(
          expect.objectContaining({
            accessToken: expect.any(String),
            refreshToken: expect.any(String),
          })
        );
      });
    });
  });

  describe('get user sessions', () => {
    describe('given user is logged in', () => {
      it('should return array of sessions', async () => {
        const send = jest.fn();
        const res = { locals: { user: Data.userResponse }, send };
        const req = {};
        const mockGetUserSessions = jest
          .spyOn(SessionService, 'findSessions')
          //@ts-ignore
          .mockReturnValue([Data.sessionResponse]);
        //@ts-ignore
        await SessionController.getUserSessions(req, res);

        expect(mockGetUserSessions).toHaveBeenCalledWith({
          userId: res.locals.user._id,
          isValid: true,
        });
        expect(send).toHaveBeenCalledWith(expect.any(Array));
      });
    });
  });

  describe('delete user sessions', () => {
    describe('given user is logged in', () => {
      it('should return accessToken and refreshToken with null value', async () => {
        const send = jest.fn();
        const res = {
          locals: { user: { ...Data.userResponse, session: Data.sessionId } },
          send,
        };
        const req = {};
        const mockUpdateSession = jest
          .spyOn(SessionService, 'updateSession')
          //@ts-ignore
          .mockReturnValue(Data.sessionResponse);

        //@ts-ignore
        await SessionController.deleteUserSessions(req, res);

        expect(mockUpdateSession).toHaveBeenCalled();
        expect(send).toHaveBeenCalledWith(
          expect.objectContaining({
            accessToken: null,
            refreshToken: null,
          })
        );
      }, 10000);
    });
  });
});
