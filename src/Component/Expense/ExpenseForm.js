import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ExpenseForm.module.css';


const ExpenseForm = ({ onAddExpense }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [selectedCategoryStyle, setSelectedCategoryStyle] = useState({});


  const handleExpenseSubmit = async (event) => {
    event.preventDefault();
  
    const newExpense = { amount, description, category };
  
    try {
      const response = await fetch('https://react-hp-325a3-default-rtdb.firebaseio.com/expenses.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });
  
      if (response.status === 200) {
        onAddExpense(newExpense);
        // setAmount('');
        // setDescription('');
        // setCategory('');
        // setSelectedCategoryStyle({});

        navigate('/welcome');
      } else {
        console.error('Failed to add expense. Server response:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding expense:', error.message);
    }
  };
  

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    const borderStyle = selectedCategory ? { border: '2px solid green' } : {};
    setSelectedCategoryStyle(borderStyle);
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add Daily Expenses</h2>
      <form onSubmit={handleExpenseSubmit}>
        <div>
          <label className={styles.label} htmlFor="amount">
            Amount:
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="description">
            Description:
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="category">
            Category:
          </label>
          <select
            className={styles.selectField}
            id="category"
            value={category}
            onChange={handleCategoryChange}
            style={selectedCategoryStyle}
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
            <option value="t-shirts">T-Shirts</option>
          </select>
        </div>
        <button className={styles.button} type="submit">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
