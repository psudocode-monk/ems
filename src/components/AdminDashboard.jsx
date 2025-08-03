import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import CreateUser from './CreateUser'
import AssignTask from './AssignTask'
import AdminTaskOverview from './AdminTaskOverview'
import LogoutButton from './LogoutButton'
import { useNavigate } from 'react-router'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('users')
  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('loggedInUser'))
    if (!userData || userData.role !== 'admin') {
      navigate('/login')
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || []
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setUsers(storedUsers)
    setTasks(storedTasks)
  }, [navigate])

  const addUser = (newUser) => {
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  const assignTask = (task) => {
    const updatedTasks = [...tasks, task]
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  const clearAllTasks = () => {
    setTasks([])
    localStorage.setItem('tasks', JSON.stringify([]))

    const clearedUsers = users.map(u => ({ ...u, tasks: [] }))
    setUsers(clearedUsers)
    localStorage.setItem('users', JSON.stringify(clearedUsers))
  }

  return (
    <div className='flex'>
      <Sidebar role='admin' onNavigate={setActiveSection} />

      <div className='ml-64 flex-1 min-h-screen bg-gray-950 text-white p-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold'>
            Hello {JSON.parse(localStorage.getItem('loggedInUser'))?.username} 👋
          </h1>
          <LogoutButton />
        </div>

        <div className='bg-gray-900 p-6 rounded-xl shadow-xl'>
          {activeSection === 'users' && (
            <CreateUser users={users} addUser={addUser} />
          )}

          {activeSection === 'assign' && (
            <AssignTask users={users} assignTask={assignTask} />
          )}

          {activeSection === 'overview' && (
            <>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>Task Overview</h2>
                <button
                  onClick={clearAllTasks}
                  className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition'
                >
                  Clear All Tasks
                </button>
              </div>

              <AdminTaskOverview tasks={tasks} users={users} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
