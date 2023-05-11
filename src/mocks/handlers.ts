/* eslint-disable import/no-extraneous-dependencies */
import { ResponseComposition, RestContext, RestRequest, rest } from 'msw';

export interface SignInPostRequestBody {
  email: string;
  password: string;
}

// Describe the shape of the mocked response body.
interface SignInPostResponseBody {
  message: string;
  email: string;
  password: string;
}

// Describe the shape of the "req.params".
interface SignInPostRequestParams {
  param1: string;
}

const loginRequest = async (
  req: RestRequest<SignInPostRequestBody>,
  res: ResponseComposition<SignInPostResponseBody>,
  ctx: RestContext
) => {
  sessionStorage.setItem('is-authenticated', 'true');

  const { email, password } = req.body;
  return res(
    ctx.status(200),
    ctx.json({
      message: 'ok',
      email,
      password,
    })
  );
};

export const handlers = [
  rest.post<SignInPostRequestBody, SignInPostResponseBody>(
    '/login',
    async (req, res, ctx) => {
      sessionStorage.setItem('is-authenticated', 'true');

      const { email, password } = req.body;
      const role = 'user';
      const name = 'user';

      if (email === 'invalid@gmial.com' || password === 'invalid') {
        return res(
          ctx.status(401),
          ctx.json({
            message: 'The email or password are not correct',
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          message: 'ok',
          email,
          password,
          user: {
            role,
            email,
            name,
          },
        })
      );
    }
  ),
];

export default { handlers };

// Revisar este codigo en este link
// https://dev.to/kettanaito/type-safe-api-mocking-with-mock-service-worker-and-typescript-21bf//
