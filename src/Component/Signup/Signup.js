import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classes from './Signup.module.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    try {
      
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY';

      if (password.length < 6) {
        console.error('Password should be at least 6 characters long.');
        return;
      }

      if (!/\d/.test(password)) {
        console.error('Password should contain at least one digit.');
        return;
      }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

     
      console.log('User has successfully signed up:', data);

      navigate('/dashboard');
    } catch (error) {
   
      console.error('Signup failed:', error);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (passwordError) {
      setPasswordError(false);
    }
  };

  return (
    <div className={classes.signupContainer}>
      <h2>SignUp</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={passwordError ? classes.error : ''}
          />
        </div>
        {passwordError && <p className={classes.errorMessage}>Passwords do not match!</p>}
        <button type='submit' className={classes.submit}>Sign Up</button>
      </form>
      <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;