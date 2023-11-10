import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Signup from './Component/Signup/Signup';

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
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
