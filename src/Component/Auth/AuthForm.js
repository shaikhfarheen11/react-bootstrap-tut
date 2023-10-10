import { useState, useRef, useContext, useEffect } from 'react';
import classes from './AuthForm.module.css';
import { AuthContext } from '../../store/auth-context';
import { Navigate } from 'react-router-dom';
const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjustedExpirationTime = parseInt(expirationTime) - currentTime;
    return adjustedExpirationTime;
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    if (storedToken && storedExpirationTime) {
      const remainingTime = calculateRemainingTime(storedExpirationTime);

      if (remainingTime <= 0) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        authCtx.logout();
        alert('Your session has expired. Please log in again.');
      } else {
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('expirationTime');
          authCtx.logout();
          alert('Your session has expired. Please log in again.');
        }, remainingTime);
      }
    }
  }, [authCtx]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY';
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Authentication failed!');
      }

      const data = await response.json();
      authCtx.login(data.idToken);

      const expirationTime = new Date().getTime() + 300000; 

      localStorage.setItem('token', data.idToken);
      localStorage.setItem('expirationTime', expirationTime.toString());

      setIsLoading(false);
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };
  if (authCtx.isLoggedIn) {
    return <Navigate to="/store" replace={true} />;
  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
      <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required 
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
          
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;