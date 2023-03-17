import axios from 'axios';

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
  await axios.get(`${url}/search/repositories`, {
    params: searchParams,
  });
};
//
