import { deserializeUser } from '../../middleware/deserializeUser';
import { requiredUser } from '../../middleware/requiredUser';
import { signToken } from '../../utils/jwt';
import * as data from '../mocks';

describe('middlware', () => {
  describe('deserialzie user', () => {
    describe('given that authorization token is set', () => {
      it('should add user object to res.locals', async () => {
        const token = signToken(data.userResponse, 'accessTokenPrivateKey');
        const req = {
          headers: {
            authorization: 'Bearer ' + token,
          },
        };
        const res = { locals: { user: {} } };
        const next = jest.fn();

        //@ts-ignore
        await deserializeUser(req, res, next);

        expect(res.locals.user).toMatchObject(
          expect.objectContaining({
            name: data.userResponse.name,
            email: data.userResponse.email,
            _id: data.userResponse._id,
          })
        );
      });
    });
  });

  describe('required user', () => {
    describe('given that there is no user session', () => {
      it('should return 401 and error message', () => {
        const status = jest.fn();
        const send = jest.fn();
        const next = jest.fn();
        
        const req = {};
        const res = {status, send };

        //@ts-ignore
        requiredUser(req, res, next);

        expect(status).toHaveBeenCalledWith(401);
        expect(send).toHaveBeenCalledWith('login is required');
      });
    });
  });
});
