import { jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'

const Alerts = () => <div>Alertas</div>

test('renders Alerts heading', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([]) }),
  ) as unknown as jest.MockedFunction<typeof fetch>

  render(<Alerts />)
  expect(screen.getByText('Alertas')).toBeTruthy()
})
