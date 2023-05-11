/* eslint-disable import/no-extraneous-dependencies */
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

import { queryClient } from './mocks/render-with-provider';
import { server } from './mocks/server';

expect.extend(matchers);

beforeEach(() => {
  queryClient.clear();
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
