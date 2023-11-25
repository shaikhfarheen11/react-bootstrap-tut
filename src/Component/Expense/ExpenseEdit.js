import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const ExpenseEdit = ({ id }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');


  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const updatedExpense = { amount, description, category };

    try {
      const response = await fetch(`https://react-hp-325a3-default-rtdb.firebaseio.com/expenses/${id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExpense),
      });

      if (response.ok) {
        console.log('Expense successfully updated');
     
        navigate('/expenses');
      } else {
        console.error('Failed to update expense. Server response:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating expense:', error.message);
    }
  };

  return (
    <div>
      <h2>Edit Expense</h2>
      <form onSubmit={handleEditSubmit}>
        <div>
          <label>Amount:</label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseEdit;
