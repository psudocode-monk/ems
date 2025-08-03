import { useState } from 'react'

const CreateUser = ({ onUserCreated }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      alert('All fields are required')
      return
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      tasks: []
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    setName('')
    setEmail('')
    setRole('user')

    onUserCreated?.(newUser)
  }

  return (
    <div className='bg-gray-900 p-6 rounded-xl text-white'>
      <h2 className='text-xl font-bold mb-4'>Create New User</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-2 rounded bg-gray-800 border border-gray-700'
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-2 rounded bg-gray-800 border border-gray-700'
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className='w-full p-2 rounded bg-gray-800 border border-gray-700'
        >
          <option value='user'>User</option>
          <option value='admin'>Admin</option>
        </select>
        <button
          type='submit'
          className='w-full bg-emerald-500 hover:bg-emerald-600 py-2 rounded'
        >
          Add User
        </button>
      </form>
    </div>
  )
}

export default CreateUser
