import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import classes from './LogoutPage.module.css';
import { logout } from '../Login/authSlice';

const LogoutPage = ({ onLogoutConfirmed, onCancel }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    const auth = getAuth();
    try {
      signOut(auth)
        .then(() => {
          dispatch(logout());
          localStorage.removeItem('isAuthenticated');
          onLogoutConfirmed();
        })
        .catch((error) => {
          console.error('Error during sign out:', error);
        });
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={classes.logoutContainer}>
      <h1>LOG OUT</h1>
      <p>Are you sure you want to log out?</p>
      <div className={classes.buttonsContainer}>
        <button onClick={handleLogout} className={classes.logoutButton}>
          Logout
        </button>
        <button onClick={handleCancel} className={classes.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
