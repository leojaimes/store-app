import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { delay } from '../../util/delay';

import { useSigninMutationQuery } from '../../api/useSignin';

const validationSchema = yup
  .object({
    email: yup.string().required('email is required').email('email is invalid'),
    password: yup.string().required('password is required'),
  })
  .required();
type Inputs = yup.InferType<typeof validationSchema>;

export function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  // const [isFetching, setIsFetchin] = useState<boolean>(false);

  const { mutate, data, error, isLoading, isSuccess } =
    useSigninMutationQuery();

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    const { email, password } = inputs;
    console.log(data);

    await delay(1);
    // const res = await signin({ email, password });
    await mutate({ email, password });
  };

  return (
    <>
      {/* <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box> */}

      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress aria-label="loading" />
        </Box>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="loginForm"
        name="loginForm"
        className="loginForm"
      >
        <Typography component="h1" variant="h5">
          Login Page
        </Typography>
        <TextField
          id="email"
          label="email"
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email?.message}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('email', { onBlur: () => trigger('email') })}
        />
        <TextField
          id="password"
          label="password"
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password?.message}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password')}
        />
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}
