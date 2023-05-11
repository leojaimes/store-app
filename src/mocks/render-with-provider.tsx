import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

export const queryClient = new QueryClient();
interface WrapperProps {
  children: React.ReactNode;
}
queryClient.clear();
export function RenderReactQueryWrapper({ children }: WrapperProps) {
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
