import React from 'react';
import classes from './Welcome.module.css';

const WelcomeScreen = () => {
  return (
    <div className= {classes.welcomeContainer}>
      <h2>Welcome to Expense Tracker!!!</h2>
  <hr />
    </div>
  );
};

export default WelcomeScreen;
