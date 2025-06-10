import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Alerts from '../Alerts';

test('renders Alerts heading', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([]) })
  ) as jest.Mock;

  const client = new QueryClient();
  render(
    <QueryClientProvider client={client}>
      <Alerts />
    </QueryClientProvider>
  );
  expect(screen.getByText('Alertas')).toBeTruthy();
});
