import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { ContactModal } from './';

afterEach(cleanup)

test('Initializes empty form', async () => {
    render(<ContactModal />);
    const nameInput = screen.queryByPlaceholderText('Name');
    const phoneInput = screen.queryByPlaceholderText('Phone Number');
    const emailInput = screen.queryByPlaceholderText('Email Address');
    const submitButton = screen.getByText('Submit');

    expect(nameInput).toBeInTheDocument()
    expect(phoneInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()

    expect(nameInput).toHaveValue('')
    expect(phoneInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
    expect(submitButton).toBeDisabled('')
});