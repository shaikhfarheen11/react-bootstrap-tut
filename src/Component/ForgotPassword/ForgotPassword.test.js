import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from './ForgotPassword';

describe('ForgotPassword component', () => {
  test('submits forgot password form', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
    });

    render(<ForgotPassword />);

    const emailInput = screen.getByLabelText(/Enter the email which you have registered/i);
    const sendLinkButton = screen.getByRole('button', { name: /Send Link/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(sendLinkButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          requestType: 'PASSWORD_RESET',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  });
});
