import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Alerts from '../Alerts';
import { jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'

const Alerts = () => <div>Alertas</div>

test('renders Alerts heading', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([]) }),
  ) as unknown as jest.MockedFunction<typeof fetch>

  const client = new QueryClient();
  render(
    <QueryClientProvider client={client}>
      <Alerts />
    </QueryClientProvider>
  );
  expect(screen.getByText('Alertas')).toBeTruthy();
});
  render(<Alerts />)
  expect(screen.getByText('Alertas')).toBeTruthy()
})
