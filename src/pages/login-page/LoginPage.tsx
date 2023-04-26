import { Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().required('email is required'),
  password: yup.string().required('password is required'),
});
type Inputs = yup.InferType<typeof validationSchema>;

export function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

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

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    console.log('onSubmit!');

    if (!email) {
      console.log(errors.email);
      console.log('email is required');
    }
    if (!password) {
      console.log('password is required');
    }
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
        {...register('email')}
      />
      <TextField
        id="password"
        label="password"
        error={Boolean(errors.password)}
        helperText={errors.password && errors.password?.message}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('password')}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
