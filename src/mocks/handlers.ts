/* eslint-disable import/no-extraneous-dependencies */
import {
  DefaultBodyType,
  PathParams,
  ResponseComposition,
  RestContext,
  RestRequest,
  rest,
} from 'msw';

const loginRequest = async (
  req: RestRequest<DefaultBodyType, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext
) => {
  sessionStorage.setItem('is-authenticated', 'true');

  return res(
    ctx.status(200),
    ctx.json({
      message: 'ok',
    })
  );
};

export const handlers = [rest.post('/login', loginRequest)];

export default { handlers };
