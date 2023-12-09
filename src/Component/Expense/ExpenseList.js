import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import { Link } from 'react-router-dom';
import styles from './ExpenseList.module.css';
import { deleteExpense } from './expensesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from './themeSlice';
import Papa from 'papaparse';



const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const dispatch = useDispatch();
  const showPremiumButton = useSelector((state) => state.expenses?.showPremiumButton);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('https://react-hp-325a3-default-rtdb.firebaseio.com/expenses.json');
      const data = await response.json();

      if (data) {
        const expensesArray = Object.entries(data).map(([id, expense]) => ({ id, ...expense }));
        setExpenses(expensesArray);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error.message);
    }
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(`https://react-hp-325a3-default-rtdb.firebaseio.com/expenses/${id}.json`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Expense successfully deleted');
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
        dispatch(deleteExpense(id)); 
      } else {
        console.error('Failed to delete expense. Server response:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting expense:', error.message);
    };
  };
const handleDownloadCSV = () => {
  const csvData = Papa.unparse(expenses);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  };

  return (
    <div>
      <ExpenseForm onAddExpense={handleAddExpense} />

      <div>
      <div className={darkMode ? styles.darkMode : ''}>
        <h2 className={styles.expenseList}>Expenses List</h2>
        {showPremiumButton && <button className={styles.activatePremium}>Activate Premium</button>}
        <button onClick={() => dispatch(toggleDarkMode())}>Toggle Dark Mode</button>
        <button onClick={handleDownloadCSV}>Download CSV</button> 

        <ul>
          {expenses.map((expense, index) => (
            <li key={index} className={styles.expenseItem}>
              <span className={styles.amount}>{expense.amount}</span> -
              <span className={styles.description}> {expense.description}</span>
              <span className={styles.category}>({expense.category})</span>
              <button className={styles.delete} onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
              <Link to={`/edit-expense/${expense.id}`}>
                <button className={styles.edit}>Edit</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
};

export default ExpenseList;