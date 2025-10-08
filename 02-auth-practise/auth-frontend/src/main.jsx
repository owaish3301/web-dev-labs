import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import SignIn from "./components/SignIn";
import SignUp from './components/SignUp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
