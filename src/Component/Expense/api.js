// api.js
export const fetchExpenses = async () => {
    try {
      const response = await fetch('https://react-hp-325a3-default-rtdb.firebaseio.com/expenses.json');
      const data = await response.json();
  
      if (data) {
        const expensesArray = Object.entries(data).map(([id, expense]) => ({ id, ...expense }));
        return expensesArray;
      }
    } catch (error) {
      console.error('Error fetching expenses:', error.message);
    }
  };
  