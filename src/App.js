import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import WelcomeScreen from './Component/WelcomeScreen/WelcomeScreen';

function App() {
  return (
    <BrowserRouter>
    <nav>
      <ul>
    <li>
     
      <Link to="/signup" style={{ color: 'black', fontSize: '1.2rem'}}>SignUp</Link>
      
      </li>
      </ul>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<WelcomeScreen />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
