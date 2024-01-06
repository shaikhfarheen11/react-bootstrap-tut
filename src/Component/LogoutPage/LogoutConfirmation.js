
import React from 'react';
import LogoutPage from './LogoutPage';

const LogoutConfirmation = ({ onLogoutConfirmed, onCancel }) => {
  return (
    <div>
      <h1>Logout Confirmation Page</h1>
      <LogoutPage onLogoutConfirmed={onLogoutConfirmed} onCancel={onCancel} />
    </div>
  );
};

export default LogoutConfirmation;
