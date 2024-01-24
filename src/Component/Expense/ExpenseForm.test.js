import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ExpenseForm from './ExpenseForm';

const reducer = (state = {}, action) => state;

const store = createStore(reducer);

global.fetch = jest.fn(() => Promise.resolve({ ok: true }));

test('submits the form with valid data', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ExpenseForm />
      </BrowserRouter>
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '50' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Groceries' } });
  fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'food' } });


  fireEvent.click(screen.getByText(/Add Expense/i));

  await screen.findByText(/Add Daily Expenses/i);

  
  const state = store.getState();
  expect(state).toEqual({
    
  });
});