import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';  
import Signup from './Signup';

const reducer = (state = {}, action) => state;

const store = createStore(reducer);

test('render Signup', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Provider>
  );

  const SignupElements = screen.getAllByText('Signup', { exact: false });
  const h2Element = SignupElements.find((element) => element.tagName === 'H2');
  expect(h2Element).toBeInTheDocument();
});
