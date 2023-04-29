import {
  Button,
  TextField,
  Typography,
  touchRippleClasses,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { delay } from '../../util/delay';

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

  const [isFetching, setIsFetchin] = useState<boolean>(false);

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     const formElement = e?.currentTarget;
  //     const formElements = formElement.elements as typeof formElement.elements & {
  //       email: { value: string };
  //       password: { value: string };
  //     };
  //     const { email, password } = formElements;
  //     e.preventDefault();
  //     if (!email.value) {
  //       setEmailHelperText('email is required');
  //     }
  //     if (!password.value) {
  //       setPasswordHelperText('password is required');
  //     }
  //   };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    console.log(data);
    setIsFetchin(true);
    await delay(1000);
    setIsFetchin(false);
  };

  return (
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
      <Button disabled={isFetching} type="submit">
        Submit
      </Button>
    </form>
  );
}
