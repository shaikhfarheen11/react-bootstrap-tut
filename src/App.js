

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import WelcomeScreen from './Component/WelcomeScreen/WelcomeScreen';

import { AuthContextProvider } from './Component/AuthContext/AuthContext';
import WinningQuote from './Component/WelcomeScreen/WinningQoute';


function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/winning-qoute" element={<WinningQuote />} />

    
    
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;