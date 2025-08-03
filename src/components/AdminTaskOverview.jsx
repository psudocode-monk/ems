import { useEffect, useState } from 'react'

const AdminTaskOverview = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('users')) || []

    const allTasks = []

    allUsers.forEach(user => {
      if (user.tasks && user.tasks.length > 0) {
        user.tasks.forEach(task => {
          allTasks.push({
            ...task,
            assignedTo: user.name,
            email: user.email
          })
        })
      }
    })

    setTasks(allTasks)
  }, [])

  return (
    <div className='bg-gray-900 p-6 rounded-xl text-white mt-6'>
      <h2 className='text-xl font-bold mb-4'>All Assigned Tasks</h2>

      {tasks.length === 0 ? (
        <p className='text-gray-400'>No tasks have been assigned yet.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full table-auto text-left'>
            <thead className='bg-gray-800 text-gray-400'>
              <tr>
                <th className='py-2 px-4'>#</th>
                <th className='py-2 px-4'>Title</th>
                <th className='py-2 px-4'>Assigned To</th>
                <th className='py-2 px-4'>Email</th>
                <th className='py-2 px-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => (
                <tr key={task.id} className='border-t border-gray-800'>
                  <td className='py-2 px-4'>{i + 1}</td>
                  <td className='py-2 px-4'>{task.title}</td>
                  <td className='py-2 px-4'>{task.assignedTo}</td>
                  <td className='py-2 px-4'>{task.email}</td>
                  <td className='py-2 px-4'>
                    {task.completed ? (
                      <span className='text-emerald-400'>Completed</span>
                    ) : (
                      <span className='text-yellow-400'>Pending</span>
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

export default AdminTaskOverview
