import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

interface SignInRequestBody {
  // Define la estructura de la solicitud de inicio de sesión
  email: string;
  password: string;
}

interface SignInMutationResponse {
  // Define la estructura de la respuesta de la mutación de inicio de sesión
  ok: string;
}

interface SignInMutationError {
  // Define la estructura de la respuesta de error de la mutación de inicio de sesión
  message: string;
  status: number;
}

export const useSigninMutationQuery = () => {
  const mutation = useMutation<
    SignInMutationResponse,
    AxiosError<SignInMutationError>,
    SignInRequestBody
  >({
    mutationFn: async (body) => {
      // return axios.post('/login', body);
      console.log(`baseUrl ${baseUrl}`);
      console.log(import.meta.env.VITE_SOME_KEY);
      try {
        const response = await axios.post(`${baseUrl}/login`, body);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          const customError: SignInMutationError = {
            message: error.response?.data?.message || 'Error desconocido',
            status: error.response?.status || 500,
          };
          return Promise.reject(customError);
        }
        return Promise.reject(error);
      }
    },

    onError: (error) => {
      // Puedes manejar el error aquí si lo deseas
      console.error('Error during mutation: ', error);
    },
    onSettled: () => {
      // queryClient.invalidateQueries('signIn'); // Invalida la caché de la consulta si es necesario
    },
  });

  return { ...mutation };
};
