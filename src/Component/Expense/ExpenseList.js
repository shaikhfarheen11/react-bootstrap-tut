import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import { Link } from 'react-router-dom';
import styles from './ExpenseList.module.css';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

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
      } else {
        console.error('Failed to delete expense. Server response:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting expense:', error.message);
    }
  };

  return (
    <div>
      <ExpenseForm onAddExpense={handleAddExpense} />

      <div>
        <h2 className={styles.expenseList}>Expenses List</h2>
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
  );
};

export default ExpenseList;