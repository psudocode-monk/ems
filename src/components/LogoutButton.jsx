import { useNavigate } from 'react-router'

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className='bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition'
    >
      Logout
    </button>
  )
}

export default LogoutButton
