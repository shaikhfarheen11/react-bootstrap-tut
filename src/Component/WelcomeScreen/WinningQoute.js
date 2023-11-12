import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaGlobe } from 'react-icons/fa'; 

import classes from './WinningQoute.module.css';

const WinningQuote = () => {
  const [fullName, setFullName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const handleUpdate = async () => {
    try {
     console.log('Payload:', JSON.stringify({ fullName, profilePhoto }));
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY`;

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          fullName: fullName,
          profilePhoto: profilePhoto,
         
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

      if (response.ok) {
        console.log('User details updated successfully!');
      
      } else {
        console.error('Failed to update user details');
       
      }
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
      <button className={classes.update} onClick={handleUpdate}>Update</button>
      <hr className={classes.updateLine} />
    </div>
  );
};

export default WinningQuote;
