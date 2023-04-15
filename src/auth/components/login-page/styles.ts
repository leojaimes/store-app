// eslint-disable-next-line import/no-extraneous-dependencies
import { SxProps, Theme } from '@mui/system';

export const styles = {
  paper: (): SxProps<Theme> | undefined => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  avatar: (): SxProps<Theme> | undefined => ({}),
  form: (): React.CSSProperties | undefined => ({
    width: '100%',
  }),
  submit: (): SxProps<Theme> | undefined => ({
    width: '100%',
  }),
};
