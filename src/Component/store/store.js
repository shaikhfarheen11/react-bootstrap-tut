
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Login/authSlice';
import expensesReducer from '../Expense/expensesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer, 
    
  },
});

export default store;
