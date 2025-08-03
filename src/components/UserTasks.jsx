import { useEffect, useState } from 'react'

const UserTasks = () => {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    const allUsers = JSON.parse(localStorage.getItem('users')) || []

    if (!loggedInUser || loggedInUser.role !== 'user') return

    const currentUser = allUsers.find(u => u.email === loggedInUser.email)
    if (currentUser) {
      setUser(currentUser)
      setTasks(currentUser.tasks || [])
    }
  }, [])

  const toggleCompletion = (taskId) => {
    const allUsers = JSON.parse(localStorage.getItem('users')) || []

    const updatedUsers = allUsers.map(u => {
      if (u.email === user.email) {
        u.tasks = u.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }
      return u
    })

    const updatedUser = updatedUsers.find(u => u.email === user.email)

    setTasks(updatedUser.tasks)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  return (
    <div className='bg-gray-900 p-6 rounded-xl text-white mt-6'>
      <h2 className='text-xl font-bold mb-4'>Your Tasks</h2>

      {tasks.length === 0 ? (
        <p className='text-gray-400'>No tasks assigned yet.</p>
      ) : (
        <ul className='space-y-4'>
          {tasks.map(task => (
            <li
              key={task.id}
              className={`p-4 rounded-lg border ${
                task.completed
                  ? 'bg-emerald-700 border-emerald-600'
                  : 'bg-gray-800 border-gray-700'
              }`}
            >
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className='text-lg font-semibold'>{task.title}</h3>
                  <p className='text-sm text-gray-400'>{task.description}</p>
                </div>
                <button
                  onClick={() => toggleCompletion(task.id)}
                  className={`px-4 py-1 rounded text-sm ${
                    task.completed
                      ? 'bg-white text-gray-900'
                      : 'bg-emerald-500 hover:bg-emerald-600'
                  }`}
                >
                  {task.completed ? 'Completed' : 'Mark Done'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserTasks
