import axios from 'axios';
import { GithubResult } from '../types/github/index';

export interface SarchRequestQueryParams {
  q?: string;
  page?: number;
  per_page: number;
}

const baseUrl =
  import.meta.env.NODE_ENV === 'test'
    ? ''
    : import.meta.env.VITE_REACT_APP_BASE_URL;

export const getRepositories = async (
  searchParams: SarchRequestQueryParams
) => {
  const res = await axios.get<GithubResult>(`${baseUrl}/search/repositories`, {
    params: searchParams,
  });
  return res;
};
