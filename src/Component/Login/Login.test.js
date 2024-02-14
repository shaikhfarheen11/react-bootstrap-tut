import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';  
import Login from './Login';

const reducer = (state = {}, action) => state;
const store = createStore(reducer);

describe('Login component', () => {
  test('submits login form', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ idToken: 'mockToken', localId: 'mockUserId' }),
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY', {
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
    });
  });
});


test('render Login within H2', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );


  const h2Element = screen.getByRole('heading', { name: /Login/i });
  expect(h2Element).toBeInTheDocument();
});

test('render Login anywhere on the screen', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  const loginElements = screen.queryAllByText(/Login/i);
 expect(loginElements.length).toBeGreaterThan(0);
});

test('render Login button', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  const loginButton = screen.getByRole('button', { name: /Login/i });

  expect(loginButton).toBeInTheDocument();
});

test('render Forgot Password link', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  const forgotPasswordLink = screen.getByText(/Forgot Password\?/i);
  expect(forgotPasswordLink).toBeInTheDocument();
});
