import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './components/Forgotpass'
import ResetPassword from './components/ResetPass'
import AdminDashboard from './pages/AdminDashboard'
import { ToastContainer } from 'react-toastify'
import UserDashboard from './pages/UserDashboard'
import Course from './pages/course'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/course" element={<Course/>}/>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
      <ToastContainer/>
    </>


  )
}

export default App
