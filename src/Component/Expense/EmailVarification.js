import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EmailVerification.module.css'; // Replace with your actual CSS module

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSendVerification = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY';
  
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email,
          requestType: 'VERIFY_EMAIL',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setVerificationSent(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error sending verification email:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={styles['email-verification-container']}>
      <div className={styles['email-verification-content']}>
        {verificationSent ? (
          <div>
            <p className={styles['success-message']}>
              Verification link sent to your email. Check your inbox and follow the instructions.
            </p>
           
            <Link to="/login" className={styles['email-verification-link']}>
              Go back to login
            </Link>
          </div>
        ) : (
          <form className={styles['email-verification-form']} onSubmit={handleSendVerification}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email">Enter the email associated with your account</label>
              <input
                type="email"
                id="email"
                className={styles['email-verification-input']}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p className={styles['error-message']}>{error}</p>}
            <button
              className={styles['email-verification-button']}
              disabled={loading}
            >
              {loading ? 'Sending Verification Email...' : 'Send Verification Email'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
