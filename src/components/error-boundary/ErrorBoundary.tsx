import { Button, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}
interface MyState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, MyState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // eslint-disable-next-line class-methods-use-this
  handleReloadClick() {
    // this.setState({ hasError: false });
    window.location.reload();
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <>
          <Typography variant="h4">There is an unexpected error</Typography>
          <Button
            type="button"
            onClick={this.handleReloadClick}
            variant="contained"
            color="primary"
          >
            Reload
          </Button>
        </>
      );
    }

    return children;
  }
}
