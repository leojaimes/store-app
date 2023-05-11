/* eslint-disable import/no-extraneous-dependencies */
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import { queryClient } from './mocks/render-with-provider';

expect.extend(matchers);

const server = setupServer(...handlers);

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
