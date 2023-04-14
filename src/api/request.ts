import axios from 'axios';

interface SignInRequestBody {
  email: string;
  password: string;
}
export const signin = async (signinRequestBody: SignInRequestBody) => {
  const res = await axios.post('/login', signinRequestBody);
  return res;
};
