import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders Signup page', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const signupElement = screen.getByText(/signup/i);
  expect(signupElement).toBeInTheDocument();
});

test('renders Login page', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const loginElement = screen.getByText(/login/i);
  expect(loginElement).toBeInTheDocument();
});

test('navigates to WelcomeScreen after login', async () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const loginElement = screen.getByText(/login/i);
  userEvent.click(loginElement);

  const loginButton = screen.getByRole('button', { name: /login/i });
  userEvent.click(loginButton);

  await waitFor(() => {
    const welcomeScreenElement = screen.getByText(/welcome/i);
    expect(welcomeScreenElement).toBeInTheDocument();
  });
});

test('navigates to ExpenseForm', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const expenseFormLink = screen.getByText(/expense-form/i);
  userEvent.click(expenseFormLink);

  const expenseFormElement = screen.getByText(/add expense/i);
  expect(expenseFormElement).toBeInTheDocument();
});

test('navigates to ExpenseList', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const expenseListLink = screen.getByText(/welcome/i);
  userEvent.click(expenseListLink);

  const expenseListElement = screen.getByText(/expense list/i);
  expect(expenseListElement).toBeInTheDocument();
});

test('navigates to Edit Expense', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const editExpenseLink = screen.getByText(/edit expense/i);
  userEvent.click(editExpenseLink);

  const editExpenseElement = screen.getByText(/edit expense/i);
  expect(editExpenseElement).toBeInTheDocument();
});

test('navigates to Winning Qoute', () => {
    render(
      <Router>
        <App />
      </Router>
    );
  
    const winningQuoteLink = screen.getByText(/winning qoute/i);
    userEvent.click(winningQuoteLink);
  
    const winningQuoteElement = screen.getByText(/winning qoute/i);
    expect(winningQuoteElement).toBeInTheDocument();
  });
  
