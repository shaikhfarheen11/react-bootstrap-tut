import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import { CartProvider } from './Component/Cart/CartContext';
import Layout from './Component/Layout/Layout';
import AuthContext from './store/auth-context';
import ContactUs from './Component/ContactUs';
const Home = lazy(() => import('./Component/Home/Home'));
const ProductScreen = lazy(() => import('./Component/ProductScreen/ProductScreen'));
const AboutUs = lazy(() => import('./Component/AboutUs/AboutUs'));
const AuthForm = lazy(() => import('./Component/Auth/AuthForm'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const LogoutScreen = lazy(() => import('./Component/Auth/Logout'));
const ProductDetails = lazy(() => import('./Component/ProductScreen/ProductDetails'));

const productsArr = [
  {
    title: 'Album 1',
    price: 12.99,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    quantity: 4,
  },
  {
    title: 'Album 2',
    price: 14.99,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    quantity: 5,
  },
  {
    title: 'Album 3',
    price: 9.99,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%3.png',
    quantity: 6,
  },
  {
    title: 'Album 4',
    price: 19.99,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%4.png',
    quantity: 4,
  },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthContextProvider>
          <CartProvider>
            <Router>
              <Layout>
              <Routes>
  <Route
    path="/home"
    element={
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <Home />
          </Layout>
        </Suspense>
      </PrivateRoute>
    }
  />
  <Route path='/auth' element={<Suspense fallback={<div>Loading...</div>}><AuthPage /></Suspense>} />
  <Route
    path="/about"
    element={
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <AboutUs />
          </Layout>
        </Suspense>
      </PrivateRoute>
    }
  />
  <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><AuthForm /></Suspense>} />
  <Route path="/logout" element={<Suspense fallback={<div>Loading...</div>}><LogoutScreen /></Suspense>} />
  <Route
    path="/contact-us"
    element={
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <ContactUs />
          </Layout>
        </Suspense>
      </PrivateRoute>
    }
  />
  <Route
    path="/store/*"
    element={
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductScreen />
        </Suspense>
      </PrivateRoute>
    }
  />
  <Route path="/product/:id" element={<Suspense fallback={<div>Loading...</div>}><ProductDetails productsArr={productsArr} /></Suspense>} />
</Routes>

              </Layout>
            </Router>
          </CartProvider>
        </AuthContextProvider>
      </header>
    </div>
  );
}

export default App;

function PrivateRoute({ children }) {
  const authCtx = React.useContext(AuthContext);
  return authCtx.isLoggedIn ? children : <Navigate to="/login" />;
}
