import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';  
import Login from './Login';

const reducer = (state = {}, action) => state;

const store = createStore(reducer);

test('render Login', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  const loginElements = screen.getAllByText('Login', { exact: false });
  const h2Element = loginElements.find((element) => element.tagName === 'H2');
  expect(h2Element).toBeInTheDocument();
});