import React, { useState} from 'react';
import styles from './ExpenseList.module.css';

import ExpenseForm from './ExpenseForm';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  
  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
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
              
               
              </li>
            ))}
          </ul>
        </div>
      </div>
   
  );
};

export default ExpenseList;
