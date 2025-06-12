import { render, screen } from '@testing-library/react';
import Swap from '../Swap';

test('renders Swap button', () => {
  render(<Swap />);
  expect(screen.getByText('Swap')).toBeTruthy();
});
