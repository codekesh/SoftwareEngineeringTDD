import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './';

const Keshav = {
  name: 'Keshav',
  email: '201117@iiitt.ac.in',
  phone: '773-304-1963',
};

const addContact = c => {
  const addContactBtn = screen.getByTestId('add-contact-btn');

  fireEvent.click(addContactBtn);

  expect(
    screen.getByTestId('contact-modal-form'),
  ).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText('Name');
  const phoneInput = screen.getByPlaceholderText('Phone Number');
  const emailInput = screen.getByPlaceholderText('Email Address');
  const form = screen.getByTestId('contact-modal-form');

  fireEvent.change(nameInput, {
    target: { value: c.name },
  });
  fireEvent.change(phoneInput, {
    target: { value: c.phone },
  });
  fireEvent.change(emailInput, {
    target: { value: c.email },
  });

  fireEvent.submit(form);
};

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

  const modal = screen.queryByTestId('contact-modal-form');

  expect(modal).not.toBeInTheDocument();

  addContact(Keshav);

  expect(modal).not.toBeInTheDocument();
});