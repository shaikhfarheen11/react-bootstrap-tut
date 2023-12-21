import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Switch from 'react-switch';
import classes from './Welcome.module.css';
import ExpenseList from '../Expense/ExpenseList';
import { toggleDarkMode } from '../Expense/themeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileCsv, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';
import { getAuth, signOut } from 'firebase/auth';

const WelcomeScreen = () => {
  const storedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(storedDarkMode);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.style.backgroundColor = darkMode ? 'black' : 'white';
    document.documentElement.style.color = darkMode ? 'white' : 'black';
  }, [darkMode]);

  useEffect(() => {
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

    fetchExpenses();
  }, []);

  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    dispatch(toggleDarkMode());
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
    }
  };

  const handleLogout = () => {
    const shouldLogout = window.confirm('Are you sure you want to logout?');
  
    if (shouldLogout) {
      const auth = getAuth();
      try {
        signOut(auth);
        navigate('/login');
        console.log('User logged out successfully');
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    }
  };
  return (
    <div className={classes.welcomeContainer}>
      <div className={classes.toggleButtonContainer}>
        <Switch
          onChange={handleToggleDarkMode}
          checked={darkMode}
          handleDiameter={24}
          onColor="#1a1a1a"
          offColor="white"
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={40}
          className={darkMode ? classes.darkSwitch : classes.lightSwitch}
        />
        <span className={darkMode ? classes.darkText : classes.lightText}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </span>
        <button onClick={handleDownloadCSV} className={classes.download}>
          <FontAwesomeIcon icon={faDownload} />
          <FontAwesomeIcon className={classes.csvData} icon={faFileCsv} />
        </button>
        <button onClick={handleLogout} className={classes.logout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
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
      <hr />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default WelcomeScreen;
