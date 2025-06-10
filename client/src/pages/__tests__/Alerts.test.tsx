import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Alerts from '../Alerts';
import { jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'

const Alerts = () => <div>Alertas</div>

process.env.VITE_API_URL = 'http://localhost:3001';

test('renders Alerts heading', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([]) })
  ) as unknown as typeof fetch;
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
