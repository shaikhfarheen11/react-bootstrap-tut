import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaGlobe } from 'react-icons/fa';
// import { getDatabase, ref, push, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';  
import { getAuth, sendEmailVerification } from 'firebase/auth';
import VerifyEmail from '../Expense/verifyEmail';


import classes from './WinningQoute.module.css';


const firebaseConfig = {
  apiKey: "AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY",
  databaseURL: 'https://react-hp-325a3-default-rtdb.firebaseio.com/',
};

const firebaseApp = initializeApp(firebaseConfig);

const WinningQuote = () => {
  const [fullName, setFullName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  useEffect(() => {
    
    fetchUserData();
  }, []); 

  const fetchUserData = async () => {
    try {
    
        console.log('Before fetch');
        const auth = getAuth(firebaseApp);
        const user = auth.currentUser;
        console.log('User:', user);
        
        if (!user) {
          console.error('User not authenticated.');
          return;
        }
        
  
      const idToken = await user.getIdToken();
  
      const identityToolkitEndpoint =  `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY`;

  
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
  
      console.log('Current User:', user);
  
      if (!user) {
        console.error('User not authenticated.');
        return;
      }
  
      // Force token refresh
      const refreshedUser = await user.getIdTokenResult(true);
      const idToken = refreshedUser.token;
  
      // Log the ID token
      console.log('ID Token:', idToken);
  
      // Verify the refreshed token
      const tokenInfo = await auth.verifyIdToken(idToken);
      console.log('Token expiration time:', tokenInfo.exp);
  
      // Continue with profile update
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
  
        // Send verification email using Firebase method
        await sendEmailVerification(user);
  
        console.log('Verification email sent successfully. Check your email and click on the link to verify.');
      } else {
        console.error('Failed to update with identity toolkit:', identityToolkitResponse.statusText);
      }
  
      setFullName('');
      setProfilePhoto('');
    } catch (error) {
      console.error('Error occurred:', error);
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

      {/* Display the VerifyEmail component next to the Update button */}
      <VerifyEmail />

      <button className={classes.update} onClick={handleUpdate}>
        Update
      </button>
      <hr className={classes.updateLine} />
    </div>
  );
};

export default WinningQuote;