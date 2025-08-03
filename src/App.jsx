import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'
import LoginPage from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/user/dashboard' element={<UserDashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
