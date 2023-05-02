import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './';

test('Shows contact modal when add contact button is clicked', () => {
  render(<App />);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();

  const addContactBtn = screen.getByTestId('add-contact-btn');

  fireEvent.click(addContactBtn);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).toBeInTheDocument();
});

test('Hides contact modal when cancel button is clicked', () => {
  render(<App />);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();

  const addContactBtn = screen.getByTestId('add-contact-btn');

  fireEvent.click(addContactBtn);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).toBeInTheDocument();

  const cancelBtn = screen.getByText('Cancel');

  fireEvent.click(cancelBtn);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();
});

test('Closes modal automatically after submit', () => {
  render(<App />);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();

  const addContactBtn = screen.getByTestId('add-contact-btn');

  fireEvent.click(addContactBtn);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText('Name');
  const phoneInput = screen.getByPlaceholderText('Phone Number');
  const emailInput = screen.getByPlaceholderText('Email Address');
  const form = screen.getByTestId('contact-modal-form')

  fireEvent.change(nameInput, { target: { value: 'Codekesh' } })
  fireEvent.change(phoneInput, { target: { value: '773-304-1963' } })
  fireEvent.change(emailInput, { target: { value: 'keshavradhika1823@gmail.com' } })

  fireEvent.submit(form);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();
});