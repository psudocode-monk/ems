import { useEffect, useState } from 'react'

const AssignTask = ({ onTaskAssigned }) => {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []
    setUsers(storedUsers)
  }, [])

  const handleAssign = (e) => {
    e.preventDefault()
    if (!selectedUserId || !taskTitle.trim() || !taskDesc.trim()) {
      alert('Please fill all fields')
      return
    }

    const updatedUsers = users.map(user => {
      if (user.id === parseInt(selectedUserId)) {
        const newTask = {
          id: Date.now(),
          title: taskTitle,
          description: taskDesc,
          completed: false
        }
        user.tasks = [...(user.tasks || []), newTask]
      }
      return user
    })

    localStorage.setItem('users', JSON.stringify(updatedUsers))

    // Optional callback to notify parent to refresh user list
    onTaskAssigned?.()

    // Reset form
    setTaskTitle('')
    setTaskDesc('')
    setSelectedUserId('')
  }

  return (
    <div className='bg-gray-900 p-6 rounded-xl text-white mt-6'>
      <h2 className='text-xl font-bold mb-4'>Assign Task</h2>
      <form onSubmit={handleAssign} className='space-y-4'>

        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className='w-full p-2 rounded bg-gray-800 border border-gray-700'
        >
          <option value=''>Select user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <input
          type='text'
          placeholder='Task title'
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className='w-full p-2 rounded bg-gray-800 border border-gray-700'
        />

        <textarea
          placeholder='Task description'
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          className='w-full p-2 rounded bg-gray-800 border border-gray-700'
        />

        <button
          type='submit'
          className='w-full bg-emerald-500 hover:bg-emerald-600 py-2 rounded'
        >
          Assign Task
        </button>
      </form>
    </div>
  )
}

export default AssignTask
