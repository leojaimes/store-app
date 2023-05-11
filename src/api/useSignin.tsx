import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

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

interface SignInMutationError {
  // Define la estructura de la respuesta de error de la mutación de inicio de sesión
  // según tus requisitos
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
      try {
        const response = await axios.post('/login', body);
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
      console.error('Error durante la mutación:', error);
    },
    onSettled: () => {
      // queryClient.invalidateQueries('signIn'); // Invalida la caché de la consulta si es necesario
    },
  });

  return { ...mutation };
};
