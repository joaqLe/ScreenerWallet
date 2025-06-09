import { render, screen } from '@testing-library/react';
import Alerts from '../Alerts';

test('renders Alerts heading', () => {
  render(<Alerts />);
  expect(screen.getByText('Alerts')).toBeInTheDocument();
});
