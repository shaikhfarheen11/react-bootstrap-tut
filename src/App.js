import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './Component/Layout/Layout';
import UserProfile from './Component/Profile/userProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/profile' element={<UserProfile />} />
      </Routes>
    </Layout>
  );
}

export default App;
