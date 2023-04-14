import axios from 'axios';

export const signin = async () => {
  const res = await axios.post('/login');
  return res;
};
