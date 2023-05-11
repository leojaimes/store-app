import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

interface SignInRequestBody {
  // Define la estructura de la solicitud de inicio de sesión
  // según tus requisitos
  email: string;
  password: string;
}

interface SignInMutationResponse {
  // Define la estructura de la respuesta de la mutación de inicio de sesión
  // según tus requisitos
  ok: string;
}

export const useSigninMutationQuery = () => {
  const mutation = useMutation<
    SignInMutationResponse,
    unknown,
    SignInRequestBody
  >({
    mutationFn: (body) => {
      return axios.post('/login', body);
    },
  });

  return { ...mutation };
};
