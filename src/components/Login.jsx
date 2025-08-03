import { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
  const [role, setRole] = useState('admin')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (!username.trim()) {
      alert('Please enter your name')
      return
    }

    const userData = { username, role }
    localStorage.setItem('loggedInUser', JSON.stringify(userData))

    if (role === 'admin') navigate('/admin/dashboard')
    else navigate('/user/dashboard')
  }

  return (
    <div className='h-screen flex items-center justify-center bg-gray-950 text-white'>
      <form 
        onSubmit={handleLogin} 
        className='bg-gray-900 p-8 rounded-xl w-96 shadow-lg space-y-6'
      >
        <h2 className='text-2xl font-bold text-center'>Login</h2>

        <div className='flex flex-col gap-2'>
          <label htmlFor='username'>Name</label>
          <input 
            id='username'
            type='text' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='role'>Role</label>
          <select 
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none'
          >
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
          </select>
        </div>

        <button 
          type='submit' 
          className='w-full py-2 rounded bg-emerald-500 hover:bg-emerald-600 transition'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
