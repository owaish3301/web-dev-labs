import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './components/pages/HomePage.jsx';
import SignIn from './components/pages/SignIn.jsx';
import SignUp from './components/pages/SignUp.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  </BrowserRouter>
)
