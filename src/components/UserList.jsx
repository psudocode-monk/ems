import { useEffect, useState } from 'react'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []
    setUsers(storedUsers)
  }, [])

  return (
    <div className='bg-gray-900 p-6 rounded-xl text-white mt-6'>
      <h2 className='text-xl font-bold mb-4'>Registered Users</h2>

      {users.length === 0 ? (
        <p className='text-gray-400'>No users created yet.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full table-auto text-left'>
            <thead className='bg-gray-800 text-gray-400'>
              <tr>
                <th className='py-2 px-4'>#</th>
                <th className='py-2 px-4'>Name</th>
                <th className='py-2 px-4'>Email</th>
                <th className='py-2 px-4'>Role</th>
                <th className='py-2 px-4'>Tasks</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user.id} className='border-t border-gray-800'>
                  <td className='py-2 px-4'>{i + 1}</td>
                  <td className='py-2 px-4'>{user.name}</td>
                  <td className='py-2 px-4'>{user.email}</td>
                  <td className='py-2 px-4 capitalize'>{user.role}</td>
                  <td className='py-2 px-4'>{user.tasks?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserList
