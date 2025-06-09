import { render, screen } from '@testing-library/react';
import Alerts from '../Alerts';

test('renders Alerts heading', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([]) })
  ) as jest.Mock;

  render(<Alerts />);
  expect(screen.getByText('Alertas')).toBeTruthy();
});
