// eslint-disable-next-line import/no-extraneous-dependencies
import {
  DefaultBodyType,
  PathParams,
  ResponseComposition,
  RestContext,
  RestRequest,
  rest,
} from 'msw';
import { makeFakeResponse, getReposPerPage } from './repos';
import { OK_STATUS } from '../consts/httpStatus';
// export const handlerPaginated = (req, res, ctx) =>
//   res(
//     ctx.status(OK_STATUS),
//     ctx.json({
//       ...makeFakeResponse({ totalCount: 10000 }),
//       items: getReposPerPage({
//         perPage: Number(req.url.searchParams.get('per_page')),
//         currentPage: req.url.searchParams.get('page'),
//       }),
//     })
//   );

export const handlerPaginated = (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext
) => {
  // const q = req.url.searchParams.get('q');
  const page = req.url.searchParams.get('page');
  const perPage = req.url.searchParams.get('per_page');
  const fakeResponse = makeFakeResponse();
  const items = getReposPerPage({
    currentPage: !Number.isNaN(Number(page)) ? Number(page) : 1,
    perPage: !Number.isNaN(Number(perPage)) ? Number(perPage) : 30,
  });
  const response = { ...fakeResponse, items };
  console.log(`FROM TEST: response.items.length ${response.items.length}`);
  return res(ctx.status(OK_STATUS), ctx.json(response));
};
