import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Component/Signup/Signup';
import { AuthContextProvider } from './Component/AuthContext/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
