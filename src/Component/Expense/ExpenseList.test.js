import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import ExpenseForm from './ExpenseForm';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('./expensesSlice', () => ({
  addExpense: jest.fn(),
}));

describe('ExpenseForm component', () => {
  test('displays error message if form submission fails', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });
  
    render(
      <BrowserRouter>
        <ExpenseForm onAddExpense={jest.fn()} />
      </BrowserRouter>
    );
  
    fireEvent.click(screen.getByText(/Add Expense/i));
  });
  
  test('does not submit form if any field is empty', async () => {
    render(
      <BrowserRouter>
        <ExpenseForm onAddExpense={jest.fn()} />
      </BrowserRouter>
    );
  
    fireEvent.click(screen.getByText(/Add Expense/i));
  
    await waitFor(() => {
      expect(fetch).not.toHaveBeenCalled();
    });
  });
  
  test('submits expense form', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
    });

    render(
      <BrowserRouter> 
        <ExpenseForm onAddExpense={jest.fn()} />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Expense' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'food' } });

    fireEvent.click(screen.getByText(/Add Expense/i));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://react-hp-325a3-default-rtdb.firebaseio.com/expenses.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: '100', description: 'Test Expense', category: 'food' }),
      });
    });
  });
});
