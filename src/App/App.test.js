import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './';

const joe = {
  name: 'Sarthak',
  email: 'sarthak12@gmail.com',
  phone: '123-456-7890',
};
const bob = {
  name: 'Keshav',
  email: 'Keshav342@gmail.com',
  phone: '123-456-9999',
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