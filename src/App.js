import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './Component/Layout/Layout';
import UserProfile from './Component/Profile/userProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!authCtx.isLoggedIn && (
          <Route path="/auth" element={<AuthPage />} />
        )}

        <Route
          path="/profile"
          element={
            authCtx.isLoggedIn ? (
              <UserProfile />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
     
    </Layout>
  );
}

export default App;
