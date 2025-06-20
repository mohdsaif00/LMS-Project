import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
/* import ForgotPassword from './components/Forgotpass' */
/* import ResetPassword from './components/resetpass' */

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/resetpassword" element={<ResetPassword />} /> */}
    </Routes> 
    </BrowserRouter>
  )
}

export default App
