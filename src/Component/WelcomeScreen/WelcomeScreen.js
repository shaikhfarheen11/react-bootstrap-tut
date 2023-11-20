import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Welcome.module.css';


const WelcomeScreen = () => {
  return (
    <div className={classes.welcomeContainer}>
    <h2>Welcome to Expense Tracker!!!</h2>
    <div className={classes.incompleteYour}>
      <p>
        <span>Your Profile is incomplete </span>
        <span className={classes.completeNow}><Link to="/winning-qoute">Complete now</Link></span>
      </p>
    </div>
      <hr />
    </div>
  );
};

export default WelcomeScreen;
