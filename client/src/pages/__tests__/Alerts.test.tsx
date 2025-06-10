import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import Alerts from '../Alerts';

process.env.VITE_API_URL = 'http://localhost:3001';

test('renders Alerts heading', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([]) })
  ) as unknown as typeof fetch;

  render(<Alerts />);
  expect(screen.getByText('Alertas')).toBeTruthy();
});
