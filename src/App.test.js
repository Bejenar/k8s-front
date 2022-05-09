import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Employee Management Application/i);
  expect(linkElement).toBeInTheDocument();
});

test('assert true is equal to true (sanity check)', () => {
  render(<App />);
  expect(true).toBe(true);
});
