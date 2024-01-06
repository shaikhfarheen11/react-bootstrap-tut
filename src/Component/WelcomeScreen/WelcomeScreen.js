import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Welcome.module.css';
import ExpenseList from '../Expense/ExpenseList';




const WelcomeScreen = () => {
  const navigate = useNavigate();
  const handleLogout = () => {

    localStorage.removeItem('idToken');

    navigate('/login');
  };

  
  return (
  
   

        <div className={classes.welcomeContainer}>
          <div className={classes.logout} onClick={handleLogout}>
      Logout
    </div>
          <h2>Welcome to Expense Tracker!!!</h2>
          <div className={classes.incompleteYour}>
            <p>
              <span>Your Profile is incomplete </span>
              <span className={classes.completeNow}>
                <Link to="/winning-qoute">Complete now</Link>
              </span>
            </p>
          </div>
          <hr/>
          <ExpenseList />
        </div>

      )}
 
export default WelcomeScreen;