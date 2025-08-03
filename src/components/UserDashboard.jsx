import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const UserDashboard = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    const users = JSON.parse(localStorage.getItem('users')) || []

    const currentUser = users.find(u => u.email === loggedInUser?.username)
    setUser(currentUser)
  }, [])

  const handleMarkAsDone = (taskId) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map(u => {
      if (u.email === user.email) {
        const updatedTasks = u.tasks.map(t =>
          t.id === taskId ? { ...t, completed: true } : t
        )
        return { ...u, tasks: updatedTasks }
      }
      return u
    })

    localStorage.setItem('users', JSON.stringify(updatedUsers))
    const updatedUser = updatedUsers.find(u => u.email === user.email)
    setUser(updatedUser)
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/login')
  }

  return (
    <div className='p-6 bg-black min-h-screen text-white relative'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold mb-1'>
            Hello {user?.name || 'User'} 👋
          </h1>
          <p className='text-sm text-gray-400'>Welcome to your dashboard</p>
        </div>

        <button
          onClick={handleLogout}
          className='bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-md font-semibold transition'
        >
          Logout
        </button>
      </div>

      <h2 className='text-xl font-semibold mb-4 border-b border-emerald-600 pb-2'>
        Your Assigned Tasks
      </h2>

      {!user?.tasks || user.tasks.length === 0 ? (
        <p className='text-gray-400 text-lg'>No tasks assigned yet.</p>
      ) : (
        <div className='overflow-x-auto rounded-xl shadow-lg border border-gray-800'>
          <table className='w-full text-sm text-left text-white'>
            <thead className='bg-emerald-700/90 text-white'>
              <tr>
                <th className='px-4 py-3'>#</th>
                <th className='px-4 py-3'>Title</th>
                <th className='px-4 py-3'>Description</th>
                <th className='px-4 py-3'>Status</th>
                <th className='px-4 py-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.tasks.map((task, index) => (
                <tr
                  key={task.id}
                  className='bg-gray-950/80 border-t border-gray-800 hover:bg-gray-900/80 transition'
                >
                  <td className='px-4 py-3'>{index + 1}</td>
                  <td className='px-4 py-3 font-semibold text-white'>
                    {task.title}
                  </td>
                  <td className='px-4 py-3 text-gray-300'>{task.description}</td>
                  <td className='px-4 py-3'>
                    {task.completed ? (
                      <span className='text-green-400 font-medium'>Completed</span>
                    ) : (
                      <span className='text-yellow-400 font-medium'>Pending</span>
                    )}
                  </td>
                  <td className='px-4 py-3'>
                    {!task.completed ? (
                      <button
                        onClick={() => handleMarkAsDone(task.id)}
                        className='bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition'
                      >
                        Mark as Done
                      </button>
                    ) : (
                      <span className='text-green-400 text-xl'>✅</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserDashboard
