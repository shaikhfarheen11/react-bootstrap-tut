import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';  
import Login from './Login';

const reducer = (state = {}, action) => state;

const store = createStore(reducer);

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
