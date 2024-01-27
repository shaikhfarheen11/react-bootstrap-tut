import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';  
import Signup from './Signup';
import userEvent from '@testing-library/user-event';

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
test("renders are good", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Provider>
  );

  const outputElement = screen.getByText(/SignUp/i);
  expect(outputElement).toBeInTheDocument();
});
test("renders change", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Provider>
  );

  const inputElement = screen.getByRole('button');
 userEvent.click(inputElement)
 
 const outputElement = screen.queryByText('good to see', { exact: false });
 expect(outputElement).toBeNull();

});

