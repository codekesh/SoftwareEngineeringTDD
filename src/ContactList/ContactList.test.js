import { render, screen, fireEvent } from '@testing-library/react';
import { ContactList } from './';

test('Renders list of contacts', () => {
  const contacts = [
    {
      name: 'Sarthak',
      email: 'sarthak503@gmail.com',
      phone: '947-354-3210',
    },
    {
      name: 'Keshav',
      email: '201117@iiitt.ac.in',
      phone: '773-304-1963',
    },
  ];

  render(<ContactList contacts={contacts} />);

  const sarRow = screen.getByTestId('contact-0');
  const kesRow = screen.getByTestId('contact-1');

  expect(sarRow).toHaveTextContent('Sarthak');
  expect(sarRow).toHaveTextContent('sarthak503@gmail.com');
  expect(sarRow).toHaveTextContent('947-354-3210');

  expect(kesRow).toHaveTextContent('Keshav');
  expect(kesRow).toHaveTextContent('201117@iiitt.ac.in');
  expect(kesRow).toHaveTextContent('773-304-1963');
});

test('Calls the delete function when delete button is clicked', () => {
  const contacts = [
    {
      name: 'Sarthak',
      email: 'sarthak503@gmail.com',
      phone: '947-354-3210',
    },
  ];

  const deleteFn = jest.fn();

  render(
    <ContactList contacts={contacts} onDeleteClick={deleteFn} />,
  );

  const deleteBtnSar = screen.getByTestId('delete-btn-0');

  fireEvent.click(deleteBtnSar);

  expect(deleteFn).toHaveBeenCalledWith(0);
});