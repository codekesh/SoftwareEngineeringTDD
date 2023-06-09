import { render, screen, fireEvent } from '@testing-library/react';
import { ContactModal } from './';

test('Initializes empty form', async () => {
    render(<ContactModal />);
    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const submitButton = screen.getByText('Submit');

    expect(nameInput).toBeInTheDocument()
    expect(phoneInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()

    expect(nameInput).toHaveValue('')
    expect(phoneInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
    expect(submitButton).toBeDisabled('')

    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
});

test('Calls cancel when cancel button is clicked', () => {
    const cancelFn = jest.fn();
    render(<ContactModal cancel={cancelFn} />);

    const cancelBtn = screen.getByText('Cancel');
    fireEvent.click(cancelBtn);
    expect(cancelFn).toHaveBeenCalled();
  });

test('Enable submit button until form is valid', () => {
    render(<ContactModal />);
    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(nameInput, { target: { value: 'Codekesh' } })
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    
    fireEvent.change(phoneInput, { target: { value: '773-304-1963' } })
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'keshavradhika1823@gmail.com' } })
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();

    expect(submitButton).not.toBeDisabled()
});

test('Disable submit button until fields are invalid', () => {
    render(<ContactModal />);
    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(nameInput, { target: { value: 'Codekesh' } })
    fireEvent.change(phoneInput, { target: { value: '773-304-1963' } })
    fireEvent.change(emailInput, { target: { value: 'keshavradhika1823' } })

    expect(submitButton).toBeDisabled()

    fireEvent.change(emailInput, { target: { value: 'keshavradhika1823@gmail.com' } })
    expect(submitButton).not.toBeDisabled()

    fireEvent.change(phoneInput, { target: { value: '7733041963' } })
    expect(submitButton).toBeDisabled()
});

test('Displays error messages for invalid inputs', () => {
    render(<ContactModal />);

    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');

    fireEvent.change(nameInput, { target: { value: 'Codekesh' } });
    fireEvent.change(phoneInput, { target: { value: '773-304-1963' } });
    fireEvent.change(emailInput, { target: { value: 'portexeofficial' } });

    let errorDiv = screen.queryByTestId('error');
    expect(errorDiv).toHaveTextContent('Please enter email format correctly');

    fireEvent.change(phoneInput, { target: { value: '773041963' } });
    fireEvent.change(emailInput, { target: { value: 'keshavradhika1823@gmail.com' } });

    errorDiv = screen.queryByTestId('error');
    expect(errorDiv).toHaveTextContent(
        'Please enter phone format correctly',
    );

    fireEvent.change(phoneInput, { target: { value: '773-304-1963' } });

    errorDiv = screen.queryByTestId('error');
    expect(errorDiv).not.toBeInTheDocument();
})

test('Prevents submit function from being called if invalid', () => {
    const onSubmit = jest.fn()

    render(<ContactModal submit={onSubmit} />);
    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const submitButton = screen.getByText('Submit');
    const form = screen.getByTestId('contact-modal-form')

    fireEvent.change(nameInput, { target: { value: 'Codekesh' } })
    fireEvent.change(phoneInput, { target: { value: '773-304-1963' } })
    fireEvent.change(emailInput, { target: { value: 'keshavradhika1823' } })

    expect(submitButton).toBeDisabled()

    fireEvent.submit(form)
    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.change(emailInput, { target: { value: 'keshavradhika1823@gmail.com' } })
    expect(submitButton).not.toBeDisabled()

    fireEvent.submit(form)
    expect(onSubmit).toHaveBeenCalled();
});