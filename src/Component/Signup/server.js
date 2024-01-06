// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001;

app.use(express.json());

app.post('/signup', async (req, res) => {
  try {
    // Placeholder for Firebase signup logic
    const firebaseSignupResponse = await performFirebaseSignup(req.body.email, req.body.password);

    if (firebaseSignupResponse.ok) {
      // Assuming user signup was successful, send verification email
      const verificationResponse = await sendVerificationEmail(firebaseSignupResponse.idToken);

      if (verificationResponse.ok) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ error: 'Failed to send verification email' });
      }
    } else {
      res.status(500).json({ error: 'Firebase signup failed' });
    }
  } catch (error) {
    console.error('Signup failed:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

const performFirebaseSignup = async (email, password) => {
  // Implement your Firebase signup logic here and return the response
  const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });
};

const sendVerificationEmail = async (idToken) => {
  // Implement your email verification logic here
  const verificationUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY';

  return fetch(verificationUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requestType: 'VERIFY_EMAIL',
      idToken,
    }),
  });
};

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
