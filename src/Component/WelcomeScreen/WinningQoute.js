import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import { getDatabase, ref, push, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';  
import { getAuth, sendEmailVerification, onAuthStateChanged, signOut } from 'firebase/auth';
import classes from './WinningQoute.module.css';



const firebaseConfig = {
  apiKey: "AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY",
  databaseURL: 'https://react-hp-325a3-default-rtdb.firebaseio.com/',
};

const firebaseApp = initializeApp(firebaseConfig);

const WinningQuote = () => {
  const [fullName, setFullName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const navigate = useNavigate(); // Get the navigation function


  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user);
      if (user) {
        fetchUserData(); 
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    fetchUserData();
  }, []); 

  const fetchUserData = async () => {
    try {
      console.log('Before fetch');
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
  
      if (!user) {
        console.error('User not authenticated.');
        return;
      }
  
      const idToken = await user.getIdToken();
      const identityToolkitEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY&idToken=${idToken}`;
  
      const identityToolkitResponse = await fetch(identityToolkitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: idToken,
        }),
      });
  
      if (identityToolkitResponse.ok) {
        const userData = await identityToolkitResponse.json();
        const { users } = userData;
  
        if (users && users.length > 0) {
          const { displayName, photoUrl } = users[0];
  
          setFullName(displayName || '');
          setProfilePhoto(photoUrl || '');
        } else {
          console.error('No user data found');
        }
      } else {
        console.error('Failed to fetch user data from identity toolkit');
      }
      console.log('After successful fetch');
    } catch (error) {
      console.error('Error occurred while fetching user data:', error);
    }
  };
  
  
  const handleUpdate = async () => {
    try {
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
  
      if (!user) {
        console.error('User not authenticated.');
        return;
      }
  
      if (!fullName || !profilePhoto) {
        console.log('Full name and profile photo URL are required.');
        return;
      }
  
      const db = getDatabase(firebaseApp);
      const dbRef = ref(db, 'winningQuotes');
  
      const data = {
        fullName: fullName,
        profilePhoto: profilePhoto,
      };
  
      const newRef = push(dbRef);
      const userKey = newRef.key;
  
      await set(ref(db, `winningQuotes/${userKey}`), data);
  
      console.log('User details updated in the Realtime Database successfully!');
  
      const idToken = await user.getIdToken();
  
      const identityToolkitEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY`;
  
      const identityToolkitResponse = await fetch(identityToolkitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: fullName,
          photoUrl: profilePhoto,
          idToken: idToken,
        }),
      });
  
      if (identityToolkitResponse.ok) {
        console.log('Identity toolkit update successful!');
      } else {
        console.error('Failed to update with identity toolkit');
      }
  
      setFullName('');
      setProfilePhoto('');
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  
  const handleVerifyEmail = async () => {
    try {
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;

      if (!user) {
        console.error('User not authenticated.');
        return;
      }
      await sendEmailVerification(user);

      console.log('Verification email sent successfully!');
      alert('Check your email. You might have received a verification link. Click on it to verify.');

      const verificationEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY`;

      const verificationResponse = await fetch(verificationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: await user.getIdToken(),
        }),
      });

      if (verificationResponse.ok) {
        console.log('One-time verification code sent successfully!');
      } else {
        console.error('Failed to send one-time verification code:', verificationResponse.statusText);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  const handleLogout = async () => {
    console.log('Logout button clicked');
    try {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
      console.log('Logout successful');
      navigate('/login'); 
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };
  
  const handleNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setProfilePhoto(event.target.value);
  };

  return (
    <div>
       <button className={classes.logout} onClick={handleLogout}>
        Logout
      </button>
      <p className={classes.winningQuote}>Winners never quit, Quitters never win.</p>
      <div className={classes.halfCompletion}>
        <p>
          <span>Your Profile is 64% completed. A Complete profile has higher chances of landing a job.</span>
          <span className={classes.completeNow}><Link to="/winning-qoute">Complete now</Link></span>
        </p>
      </div>
      <hr />

      <span className={classes.contactDetails}>Contact Details</span>
      <button className={classes.cancel}>Cancel</button>
      <div className={classes.inputFields}>
        <FaGithub className={classes.gitHubIcon} />
        Full Name:
        <input
          type="text"
          className={classes.fullNameInput}
          style={{ textAlign: 'left' }}
          value={fullName}
          onChange={handleNameChange}
        />
        <FaGlobe className={classes.globeIcon} />
        Profile Photo Url:
        <input
          type="text"
          className={classes.profileURLInput}
          style={{ textAlign: 'left' }}
          value={profilePhoto}
          onChange={handlePhotoChange}
        />
      </div>
      <button className={classes.update} onClick={handleUpdate}>Update</button>
      <hr className={classes.updateLine} />
      <button className={classes.verifyEmail} onClick={handleVerifyEmail}>
        Verify Email
      </button>
      <hr className={classes.verifyEmailLine} />
    </div>
  );
};

export default WinningQuote;