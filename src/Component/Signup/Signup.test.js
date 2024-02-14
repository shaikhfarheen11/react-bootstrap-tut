import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';  
import Signup from './Signup';


const reducer = (state = {}, action) => state;
const store = createStore(reducer);

describe('Signup component', () => {
  test('submits signup form and redirects to login page', async () => {
    const mockedResponse = { status: 200 };
    global.fetch = jest.fn().mockResolvedValueOnce(mockedResponse);
  
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );
  
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
    const signupButton = screen.getByRole('button', { name: /Sign Up/i });
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(signupButton);
  
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(screen.getByText(/Have an account?/i)).toBeInTheDocument();
    });
  });
  
});


test('render Signup within H2', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Provider>
  );

  const h2Element = screen.getByRole('heading', { name: /SignUp/i });
  expect(h2Element).toBeInTheDocument();
});

test('render Signup anywhere on the screen', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Provider>
  );

  const signupElements = screen.queryAllByText(/SignUp/i);
  expect(signupElements.length).toBeGreaterThan(0);
});

test('render Signup button', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Provider>
  );

  const signupButton = screen.getByRole('button', { name: /Sign Up/i });
  expect(signupButton).toBeInTheDocument();
});

test('render Login link', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Provider>
  );

  const loginLink = screen.getByText(/Login/i);
  expect(loginLink).toBeInTheDocument();
});
