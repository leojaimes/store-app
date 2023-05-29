/* eslint-disable import/no-extraneous-dependencies */
import matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';

import { queryClient } from './mocks/render-with-provider';
import { server } from './mocks/server';

expect.extend(matchers);

vi.mock(`./config`, () => ({
  baseUrl: '',
}));

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
