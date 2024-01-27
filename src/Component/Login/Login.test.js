import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';  
import Login from './Login';

const reducer = (state = {}, action) => state;

const store = createStore(reducer);

// First test case
test('render Login within H2', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  // Use getByRole to get the h2 element containing "Login"
  const h2Element = screen.getByRole('heading', { name: /Login/i });

  // Check if the h2 element is present
  expect(h2Element).toBeInTheDocument();
});

// Second test case
// Second test case
test('render Login anywhere on the screen', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  // Use queryAllByText to get all elements with the text "Login"
  const loginElements = screen.queryAllByText(/Login/i);

  // Check if at least one login element is present
  expect(loginElements.length).toBeGreaterThan(0);
});
// Third test case
test('render Login button', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  // Use getByRole to get the button element with the text "Login"
  const loginButton = screen.getByRole('button', { name: /Login/i });

  // Check if the login button is present
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

  // Check if the Forgot Password link is present
  expect(forgotPasswordLink).toBeInTheDocument();
});
