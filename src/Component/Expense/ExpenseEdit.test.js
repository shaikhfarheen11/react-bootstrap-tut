import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExpenseEdit from './ExpenseEdit';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('ExpenseEdit component', () => {
  test('submits expense edit form', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
    });

    render(<ExpenseEdit id="123" />);
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Expense' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Food' } });
    fireEvent.click(screen.getByText(/Submit/i));
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://react-hp-325a3-default-rtdb.firebaseio.com/expenses/123.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: '100', description: 'Test Expense', category: 'Food' }),
      });
     
    });
  });
});
