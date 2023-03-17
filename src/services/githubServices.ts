import axios from 'axios';
import { GithubResult } from '../types/github/index';

export interface SarchRequestQueryParams {
  q?: string;
  page?: number;
  per_page: number;
}
const url = 'https://api.github.com';

// type SaveProductFunction = () => void;
export const getRepositories = async (
  searchParams: SarchRequestQueryParams
) => {
  const res = await axios.get<GithubResult>(`${url}/search/repositories`, {
    params: searchParams,
  });
  return res;
};
//
