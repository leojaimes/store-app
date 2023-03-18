import axios from 'axios';
import { GithubResult } from '../types/github/index';

export interface SarchRequestQueryParams {
  q?: string;
  page?: number;
  per_page: number;
}
const url = 'https://api.github.com';

const baseUrl =
  import.meta.env.NODE_ENV === 'test'
    ? ''
    : import.meta.env.VITE_REACT_APP_BASE_URL;
console.log(`REACT_APP_BASE_URL: ${import.meta.env.VITE_REACT_APP_BASE_URL}`);
// type SaveProductFunction = () => void;
export const getRepositories = async (
  searchParams: SarchRequestQueryParams
) => {
  const res = await axios.get<GithubResult>(`${baseUrl}/search/repositories`, {
    params: searchParams,
  });
  return res;
};
//
