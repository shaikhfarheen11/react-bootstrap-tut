import React, { useState, useEffect } from 'react';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import classes from './verifyEmail.module.css';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onIdTokenChanged(auth, async (authUser) => {
      if (authUser) {
        console.log('Auth state changed:', authUser);
        console.log('User email verified status:', authUser.emailVerified);
        setVerificationSent(authUser.emailVerified);
      } else {
        setVerificationSent(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSendVerification = async () => {
    try {
      setLoading(true);

      const auth = getAuth();
      let currentUser = auth.currentUser;

      if (!currentUser) {
        currentUser = await new Promise((resolve) => {
          const unsubscribe = onIdTokenChanged(auth, (user) => {
            if (user) {
              resolve(user);
              unsubscribe();
            }
          });
        });

        if (!currentUser) {
          console.error('User not authenticated.');
          throw new Error('User not authenticated.');
        }
      }

      console.log('Sending verification email for user:', currentUser.email);

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY`, 
        {
          method: 'POST',
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: await currentUser.getIdToken(),
            email: currentUser.email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log('Verification email sent successfully.');
        setVerificationSent(true);
      } else {
        console.log('Failed to send verification email:', response);
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Failed to send verification email.');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error sending verification email:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSendVerification} disabled={loading} className={classes['verify-email-button']}>
        {loading ? 'Sending Verification Email...' : 'Verify Email'}
      </button>

   
      {verificationSent ? (
        <p>Your email is verified. Thank you!</p>
      ) : (
        error && <p className={classes['verify-email-error']}>Error: {error}</p>
      )}
    </div>
  );
};

export default VerifyEmail;
